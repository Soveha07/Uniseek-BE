import { Module } from '@nestjs/common';
import { MentorsService } from './mentors.service';
import { MentorsController } from './mentors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mentor } from './entities/mentor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mentor]),
  ],
  controllers: [MentorsController],
  providers: [MentorsService],
  exports: [MentorsService, TypeOrmModule],
})
export class MentorsModule { }
