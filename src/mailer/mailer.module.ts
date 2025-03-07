import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule], // Import ConfigModule for environment variables
    providers: [MailerService], // Register MailerService
    exports: [MailerService], // Export to use it in other modules
})
export class MailerModule { }