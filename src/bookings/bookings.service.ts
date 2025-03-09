import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Mentor } from 'src/mentors/entities/mentor.entity';

@Injectable()
export class BookingsService {

  constructor(
    private readonly mailerService: MailerService,

    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    @InjectRepository(Mentor)
    private readonly mentorRepository: Repository<Mentor>,
  ) { }

  // async sendWelcomeEmail(userEmail: string) {
  //   return this.mailerService.sendMail(
  //     userEmail,
  //     'Welcome to Our App!',
  //     'Thank you for signing up!',
  //     '<h1>Welcome!</h1><p>We are happy to have you.</p>',
  //   );
  // }

  async createBooking(createBookingDto: CreateBookingDto): Promise<void> {
    const { student_id, mentor_id, day, time } = createBookingDto;

    // Fetch the actual Student and Mentor entities
    const student = await this.studentRepository.findOne({ where: { uid: student_id } });
    const mentor = await this.mentorRepository.findOne({ where: { id: mentor_id } });

    await this.mailerService.sendBookingMailMentor(
      mentor.email,
      student.displayName,
      day,
      time,
      student.email,
      student.phoneNumber,
      mentor.fullName,
    );

    await this.mailerService.sendBookingMailStudent(
      student.email,
      mentor.fullName,
      mentor.email,
      mentor.phoneNumber,
      day,
      time,
      student.displayName,
    );

    if (!student) {
      throw new NotFoundException(`Student with ID ${student_id} not found`);
    }
    if (!mentor) {
      throw new NotFoundException(`Mentor with ID ${mentor_id} not found`);
    }

    const newBooking = this.bookingRepository.create({
      student, // Assign the full entity
      mentor,
      day,
      time,
      bookedAt: new Date(), // Current timestamp
    });

    await this.bookingRepository.save(newBooking);
  }


  // 2️⃣ & 3️⃣ Update status (Reusable for both "ongoing" & "completed")
  async updateStatus(id: number, status: BookingStatus): Promise<void> {
    try {
      const booking = await this.bookingRepository.findOne({
        where: { id },
        relations: ['student', 'mentor']  // Load the student relation
      });
      const student = await this.studentRepository.findOne({ where: { uid: booking.student.uid } });
      const mentor = await this.mentorRepository.findOne({ where: { id: booking.mentor.id } });

      if (!booking) {
        throw new NotFoundException(`Booking with ID ${id} not found`);
      }

      if (status === BookingStatus.ONGOING) {
        console.log("ongoing");
        await this.mailerService.sendBookingConfirmationStudent(
          student.email,
          student.displayName,
          mentor.fullName,
          booking.day,
          booking.time,
          mentor.email,
          mentor.phoneNumber,
          mentor.telegramLink
        );

      }

      booking.status = status;
      await this.bookingRepository.save(booking);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getBookingsByMentorId(mentorId: number): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { mentor: { id: mentorId } },
      relations: ['mentor', 'student'],
    });
  }

  async getBookingsByStudentId(studentId: string): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { student: { uid: studentId } },
      relations: ['student', 'mentor'],
    });
  }
}
