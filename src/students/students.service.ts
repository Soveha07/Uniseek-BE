import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { CreateStudentGoogleDto } from './dto/create-student-google.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    @Inject(forwardRef(() => AuthService))
    private studentRepository: Repository<Student>,
    private readonly authService: AuthService
  ) { }


  findAll() {
    return `This action returns all students`;
  }


  async findById(uid: string): Promise<Student> {
    const user = await this.studentRepository.findOne({
      where: { uid },
    });
    console.log(user);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async createEndUser(createStudentDto: CreateStudentDto): Promise<any> {
    const { username, email, password } = createStudentDto;

    const existingUser = await this.studentRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email already exists.');
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.studentRepository.create({
      ...createStudentDto,
      displayName: username,
      email,
      password: hashedPassword,
      provider: "UniSeek",
      createdAt: new Date(),
    });

    try {
      const user = await this.studentRepository.save(newUser);
      if (user) {

        const createdUser = await this.findByEmail(user.email);
        const tokens = await this.authService.generateTokens(createdUser.email, createdUser.uid, createdUser.role)
        const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
        await this.updateRefreshToken(createdUser.uid, hashedRefreshToken);

        return {
          userId: createdUser.uid,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        };
      }

    } catch (error) {
      throw new Error(error);
    }
  }

  async findByEmail(email: string): Promise<Student | undefined> {
    return this.studentRepository.findOne({ where: { email } });
  }

  async updateStudent(studentId: string, userName: string, phoneNumber: string): Promise<String> {
    const student = await this.studentRepository.findOne({
      where: { uid: studentId },
    });
    if (!student) {
      throw new Error('User not found');
    }
    student.displayName = userName;
    student.phoneNumber = phoneNumber;
    try {
      this.studentRepository.save(student);
      return "Updated Successfully"
    }
    catch (error) {
      console.error(error);
      return "Failed to update the user";
    }
  }

  async deleteStudent(uid: string): Promise<void> {
    const result = await this.studentRepository.delete(uid);
    if (result.affected === 0) {
      throw new NotFoundException(`Student with ID "${uid}" not found`);
    }
  }

  async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    console.log("userId", userId);
    console.log("refreshToken", refreshToken);
    await this.studentRepository.update(userId, { refresh_token: refreshToken });
  }

  async create(user: CreateStudentGoogleDto) {
    return this.studentRepository.save(user);
  }
}
