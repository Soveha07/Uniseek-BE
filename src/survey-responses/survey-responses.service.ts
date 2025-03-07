import { Injectable } from '@nestjs/common';
import { CreateSurveyResponseDto } from './dto/create-survey-response.dto';
import { UpdateSurveyResponseDto } from './dto/update-survey-response.dto';
import { SurveyResponse } from './entities/survey-response.entity';
import { Student } from 'src/students/entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { University } from 'src/universities/entities/university.entity';
import { CareerField } from 'src/career-fields/entities/career-field.entity';
import { getRepository } from "typeorm";
// i don know why i cannot push the new update one

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

  async recommendUniversities(dto: CreateSurveyResponseDto): Promise<{ university: University; score: number }[]> {
    const universities = await this.universityRepository.find({ relations: ["universityMajors"] });
    const careerFieldRepository = getRepository(CareerField);

    // Fetch all career fields from the database
    const careerFields = await careerFieldRepository.find(); 
    const validCareerFields = careerFields.map(field => field.name); // Extract valid career field names dynamically

    const scoredUniversities: { university: University; score: number }[] = [];

    for (const university of universities) {
        let score = 0;

        if (validCareerFields.includes(dto.futureCareer)) {
            score += 25;
        }

        const minPrice = university.minPrice || 0;
        const maxPrice = university.maxPrice || Infinity;
        const budgetLimit = parseInt(dto.budget.replace(/\D/g, ""), 10) || 500; // Extracts number from "Less than $500"

        if (minPrice <= budgetLimit && maxPrice <= budgetLimit) {
            score += 20;
        } else if (minPrice <= budgetLimit + 200) { // Slightly above budget
            score += 10;
        }

        if (university.scholarship === dto.scholarships) {
            score += 10;
        }

        if (university.exchange === dto.exchangeProgram) {
            score += 10;
        }

        if (university.facility === dto.facilities) {
            score += 10;
        }

        if (university.shift === dto.shift) {
            score += 10;
        }

        if (university.classSize === dto.classSize) {
            score += 10;
        }

        scoredUniversities.push({ university, score });
    }

    scoredUniversities.sort((a, b) => b.score - a.score);
    return scoredUniversities.slice(0, 5);
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