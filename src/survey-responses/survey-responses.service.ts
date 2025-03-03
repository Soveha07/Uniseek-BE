import { Injectable } from '@nestjs/common';
import { CreateSurveyResponseDto } from './dto/create-survey-response.dto';
import { UpdateSurveyResponseDto } from './dto/update-survey-response.dto';
import { SurveyResponse } from './entities/survey-response.entity';
import { Student } from 'src/students/entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { University } from 'src/universities/entities/university.entity';

@Injectable()
export class SurveyResponsesService {
  constructor(
    @InjectRepository(SurveyResponse)
    private readonly surveyResponseRepository: Repository<SurveyResponse>,

    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
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

  async recommendUniversities(dto: CreateSurveyResponseDto): Promise<University[]> {
    const universities = await this.universityRepository.find(); // Fetch all universities from DB

    // Initialize scores with university ID as number
    const universityScores = new Map<number, number>();
    universities.forEach(university => universityScores.set(university.id, 0));

    switch (dto.futureCareer) {
      case 'Technology & IT':
        universityScores.set(1, (universityScores.get(1) || 0) + 8); // University ID 1
        universityScores.set(3, (universityScores.get(3) || 0) + 6);
        universityScores.set(5, (universityScores.get(5) || 0) + 8);
        break;
      case 'Healthcare & Medicine':
        universityScores.set(4, (universityScores.get(4) || 0) + 10);
        break;
      case 'Business & Finance':
        universityScores.set(5, (universityScores.get(5) || 0) + 7);
        break;
      case 'Engineering & Science':
        universityScores.set(6, (universityScores.get(6) || 0) + 9);
        break;
      default:
        console.log('Invalid future career selection');
    }

    switch (dto.budget) {
      case 'Less than $500':
        universityScores.set(1, (universityScores.get(1) || 0) + 7);
        universityScores.set(6, (universityScores.get(6) || 0) + 5);
        break;
      case '$500 - $1000':
        universityScores.set(2, (universityScores.get(2) || 0) + 6);
        break;
      case '$1000 - $2000':
        universityScores.set(3, (universityScores.get(3) || 0) + 8);
        break;
      case '$2000 - $3000':
        universityScores.set(4, (universityScores.get(4) || 0) + 10);
        break;
      case '$4000 - $5000':
        universityScores.set(5, (universityScores.get(5) || 0) + 12);
        break;
      case '$5000 - $6000':
        universityScores.set(6, (universityScores.get(6) || 0) + 14);
        break;
      case 'More than $6000':
        universityScores.set(7, (universityScores.get(7) || 0) + 15);
        break;
      default:
        console.log('Invalid budget selection');
    }

    switch (dto.scholarships) {
      case 'So much':
        universityScores.set(1, (universityScores.get(1) || 0) + 3);
        break;
      case 'Neutral':
        universityScores.set(3, (universityScores.get(3) || 0) + 5);
        break;
      case 'Not much':
        universityScores.set(4, (universityScores.get(4) || 0) + 7);
        break;
      default:
        console.log('Invalid scholarship selection');
    }

    switch (dto.exchangeProgram) {
      case 'So much':
        universityScores.set(1, (universityScores.get(1) || 0) + 9);
        universityScores.set(2, (universityScores.get(2) || 0) + 4);
        break;
      case 'Neutral':
        universityScores.set(3, (universityScores.get(3) || 0) + 6);
        break;
      case 'Not much':
        universityScores.set(4, (universityScores.get(4) || 0) + 8);
        break;
      default:
        console.log('Invalid exchange program selection');
    }

    switch (dto.facilities) {
      case 'So much':
        universityScores.set(1, (universityScores.get(1) || 0) + 10);
        break;
      case 'Neutral':
        universityScores.set(2, (universityScores.get(2) || 0) + 7);
        break;
      case 'Not much':
        universityScores.set(3, (universityScores.get(3) || 0) + 5);
        break;
      default:
        console.log('Invalid facilities selection');
    }

    switch (dto.shift) {
      case 'Only a shift 3 or 4 hours':
        universityScores.set(1, (universityScores.get(1) || 0) + 6);
        break;
      case 'Full-time 8 hours':
        universityScores.set(2, (universityScores.get(2) || 0) + 5);
        break;
      case 'Flexibility of timetable':
        universityScores.set(3, (universityScores.get(3) || 0) + 4);
        break;
      default:
        console.log('Invalid shift selection');
    }

    switch (dto.classSize) {
      case 'Small class':
        universityScores.set(1, (universityScores.get(1) || 0) + 7);
        break;
      case 'Flexible class (Depend on the study course)':
        universityScores.set(2, (universityScores.get(2) || 0) + 6);
        break;
      default:
        console.log('Invalid class size selection');
    }

    // Map scores back to university objects
    const scoredUniversities = universities.map(university => ({
      ...university,
      score: universityScores.get(university.id) || 0,
    }));

    // Filter universities with score > 0
    const universitiesWithScore = scoredUniversities.filter(university => university.score > 0);

    // Sort the universities based on score and return the top 5 if there are more than 5, otherwise return all universities with score > 0
    return universitiesWithScore.sort((a, b) => b.score - a.score).slice(0, 5);
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
