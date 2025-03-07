import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { MailerService } from 'src/mailer/mailer.service';
import { MailerModule } from 'src/mailer/mailer.module';


@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports: [MailerModule],
  exports: [BookingsService]
})
export class BookingsModule { }
