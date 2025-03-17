import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { Rating } from './entities/rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorsModule } from 'src/mentors/mentors.module';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rating]),
    MentorsModule,
    StudentsModule
  ],
  controllers: [RatingsController],
  providers: [RatingsService],
  exports: [RatingsService, TypeOrmModule],
})
export class RatingsModule { }
