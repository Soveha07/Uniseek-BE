import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/guards/jwt-guard';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { dataSource } from 'db/typeorm.config';
import { UniversitiesModule } from './universities/universities.module';
import { MajorsModule } from './majors/majors.module';
import { SurveyResponsesModule } from './survey-responses/survey-responses.module';
import { CareerFieldsModule } from './career-fields/career-fields.module';
import { MentorsModule } from './mentors/mentors.module';
import { MailerService } from './mailer/mailer.service';
import { BookingsModule } from './bookings/bookings.module';


@Module({
  imports: [
    StudentsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot(dataSource.options),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get('POSTGRES_HOST'),
    //     port: configService.get<number>('POSTGRES_PORT'),
    //     username: configService.get('POSTGRES_USER'),
    //     password: configService.get<string>('POSTGRES_PASSWORD'),
    //     database: configService.get('POSTGRES_DATABASE'),
    //     entities: [join(__dirname + '/**/*.entity{.ts,.js}')],
    //     ssl: {
    //       ca: configService.get<string>("POSTGRES_SSL_CA_PATH"),
    //     },
    //   }),
    // }),
    StudentsModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'google' }),
    UniversitiesModule,
    MajorsModule,
    SurveyResponsesModule,
    CareerFieldsModule,
    MentorsModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    GoogleStrategy,
    MailerService
  ],
})
export class AppModule { }
