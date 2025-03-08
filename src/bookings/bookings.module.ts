import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { MailerService } from 'src/mailer/mailer.service';
import { MailerModule } from 'src/mailer/mailer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { MentorsModule } from 'src/mentors/mentors.module';
import { StudentsModule } from 'src/students/students.module';


@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports: [
    MailerModule,
    TypeOrmModule.forFeature([Booking]),
    MentorsModule,
    StudentsModule
  ],
  exports: [BookingsService, TypeOrmModule],
})
export class BookingsModule { }
