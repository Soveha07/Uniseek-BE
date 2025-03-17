import { BadRequestException, forwardRef, HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { CreateStudentGoogleDto } from './dto/create-student-google.dto';
import { STATUS_CODES } from 'http';
import { StatusCodes } from 'src/enums/statusCodes';

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
    const { username, phone_number, email, password } = createStudentDto;

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
      phoneNumber: phone_number,
      email: email,
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

  async updatePassword(uid: string, newPassword: string, currentPassword?: string): Promise<string> {
    const student = await this.studentRepository.findOne({
      where: { uid },
    });

    if (student.password !== null) {
      const isPasswordValid = await bcrypt.compare(currentPassword, student.password);
      if (!isPasswordValid) {
        throw new HttpException("Your current password isn't correct", StatusCodes.BadRequest);
      }
    }

    if (!student) {
      throw new NotFoundException('User not found');
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      student.password = hashedPassword;
      await this.studentRepository.save(student);

      return "Password updated successfully";
    } catch (error) {
      console.error('Error updating password:', error);
      throw new InternalServerErrorException('Failed to update password');
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

  async updateProfileImage(uid: string, imageUrl: string): Promise<Student> {
    const student = await this.findById(uid);
    if (!student) {
      throw new NotFoundException(`Student with ID ${uid} not found`);
    }

    student.photoURL = imageUrl;
    return this.studentRepository.save(student);
  }
}
