import { Module } from '@nestjs/common';
import { SurveyResponsesService } from './survey-responses.service';
import { SurveyResponsesController } from './survey-responses.controller';
import { SurveyResponse } from './entities/survey-response.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from 'src/students/students.module';
import { UniversitiesModule } from 'src/universities/universities.module';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyResponse]), StudentsModule, UniversitiesModule],
  controllers: [SurveyResponsesController],
  providers: [SurveyResponsesService],
  exports: [SurveyResponsesService, TypeOrmModule],
})
export class SurveyResponsesModule { }
