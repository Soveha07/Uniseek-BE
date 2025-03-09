import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Public } from 'src/decorators/public.decorator';
import { Booking, BookingStatus } from './entities/booking.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) { }

  // @Public()
  // @Post('/send-mail')
  // async registerUser(@Body('email') email: string) {
  //   await this.bookingsService.sendWelcomeEmail(email);
  //   return { message: 'Welcome email sent!' };
  // }

  // Create a new booking
  @Post()
  createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.createBooking(createBookingDto);
  }

  // Update status to "ongoing"
  @Patch('/ongoing/:id')
  updateStatusToOngoing(@Param('id') id: number) {
    return this.bookingsService.updateStatus(id, BookingStatus.ONGOING);
  }

  // Update status to "completed"
  @Patch('/completed/:id')
  updateStatusToCompleted(@Param('id') id: number) {
    return this.bookingsService.updateStatus(id, BookingStatus.COMPLETED);
  }

  @Get('mentor/:mentorId')
  getBookingsByMentor(@Param('mentorId') mentorId: number): Promise<Booking[]> {
    return this.bookingsService.getBookingsByMentorId(mentorId);
  }

  @Get('student/:studentId')
  getBookingsByStudent(@Param('studentId') studentId: string): Promise<Booking[]> {
    return this.bookingsService.getBookingsByStudentId(studentId);
  }

}
