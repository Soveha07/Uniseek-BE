import { Module } from '@nestjs/common';
import { MentorsService } from './mentors.service';
import { MentorsController } from './mentors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mentor } from './entities/mentor.entity';
import { MajorsModule } from 'src/majors/majors.module';
import { UniversitiesModule } from 'src/universities/universities.module';
import { StorageModule } from '../students/storage.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Mentor]),
    MajorsModule,
    UniversitiesModule,
    StorageModule,
  ],
  controllers: [MentorsController],
  providers: [MentorsService],
  exports: [MentorsService, TypeOrmModule],
})
export class MentorsModule { }
