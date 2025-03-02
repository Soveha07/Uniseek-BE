import { Injectable } from '@nestjs/common';
import { CreateSurveyResponseDto } from './dto/create-survey-response.dto';
import { UpdateSurveyResponseDto } from './dto/update-survey-response.dto';
import { SurveyResponse } from './entities/survey-response.entity';
import { Student } from 'src/students/entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyResponsesService {
  constructor(
    @InjectRepository(SurveyResponse)
    private readonly surveyResponseRepository: Repository<SurveyResponse>,

    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) { }

  async createSurveyResponse(dto: CreateSurveyResponseDto): Promise<Omit<SurveyResponse, 'student'>> {
    const student = await this.studentRepository.findOne({ where: { uid: dto.studentId } });
    if (!student) {
      throw new Error('Student not found');
    }

    const newSurveyResponse = this.surveyResponseRepository.create({
      ...dto,
      student,
    });

    const savedResponse = await this.surveyResponseRepository.save(newSurveyResponse);

    const { student: _, ...responseWithoutStudent } = savedResponse;
    return responseWithoutStudent;
  }


  findAll() {
    return `This action returns all surveyResponses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} surveyResponse`;
  }

  update(id: number, updateSurveyResponseDto: UpdateSurveyResponseDto) {
    return `This action updates a #${id} surveyResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} surveyResponse`;
  }
}
