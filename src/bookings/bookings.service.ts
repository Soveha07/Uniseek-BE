import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class BookingsService {

  constructor(private readonly mailerService: MailerService) { }

  async sendWelcomeEmail(userEmail: string) {
    return this.mailerService.sendMail(
      userEmail,
      'Welcome to Our App!',
      'Thank you for signing up!',
      '<h1>Welcome!</h1><p>We are happy to have you.</p>',
    );
  }

  create(createBookingDto: CreateBookingDto) {
    return 'This action adds a new booking';
  }

  findAll() {
    return `This action returns all bookings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
