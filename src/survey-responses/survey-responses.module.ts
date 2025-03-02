import { Module } from '@nestjs/common';
import { SurveyResponsesService } from './survey-responses.service';
import { SurveyResponsesController } from './survey-responses.controller';
import { SurveyResponse } from './entities/survey-response.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyResponse]), StudentsModule],
  controllers: [SurveyResponsesController],
  providers: [SurveyResponsesService],
  exports: [SurveyResponsesService, TypeOrmModule],
})
export class SurveyResponsesModule { }
