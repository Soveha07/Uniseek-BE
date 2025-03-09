import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorsService } from './mentors.service';
import { MentorsController } from './mentors.controller';
import { Mentor } from './entities/mentor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mentor])],
  controllers: [MentorsController],
  providers: [MentorsService],
  exports: [MentorsService],
})
export class MentorsModule {}