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
import { ShowUniversityDto } from 'src/universities/dto/show-university.dto';
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
      createdAt: new Date(),
    });

    const savedResponse = await this.surveyResponseRepository.save(newSurveyResponse);

    const { student: _, ...responseWithoutStudent } = savedResponse;
    return responseWithoutStudent;
  }

  async recommendUniversities(dto: CreateSurveyResponseDto): Promise<ShowUniversityDto[]> {
    const universities = await this.universityRepository.find({
      relations: ["universityCareerfields", "universityCareerfields.careerField"]
    });

    // Parse the budget range from the DTO
    const { min: budgetMin, max: budgetMax } = this.parseBudgetRange(dto.budget);

    const scoredUniversities: ShowUniversityDto[] = [];

    for (const university of universities) {
      let score = 0;

      // Check if the university offers the selected career field
      if (university.universityCareerfields.some(ucf => ucf.careerField.name === dto.futureCareer)) {
        score += 25;
        console.log("ucf", university);
      }

      // Extract university price range
      const minPrice = university.minPrice || 0;
      const maxPrice = university.maxPrice || Infinity;

      // Compare university price with budget range
      if (minPrice >= budgetMin && maxPrice <= budgetMax) {
        score += 20; // Best match (within budget)
        console.log("within price range", university);
      } else if (minPrice <= budgetMax + 500) {
        score += 10; // Slightly above budget but still reasonable
        console.log("slighly above budget", university);
      } else if (minPrice <= budgetMax + 1500) {
        score += 5; // Within an acceptable range but not strictly within budget
        console.log("within acceptable range but above budget", university);
      }

      if (university.scholarship === dto.scholarships) {
        score += 10;
        console.log("scholar", university);
      }

      if (university.exchange === dto.exchangeProgram) {
        score += 10;
        console.log("exch", university);
      }

      if (university.facility === dto.facilities) {
        score += 10;
        console.log("fac", university);
      }

      if (university.shift === dto.shift) {
        score += 10;
        console.log("shift", university);
      }

      if (university.classSize === dto.classSize) {
        score += 10;
        console.log("size", university);
      }

      // Create a ShowUniversityDto object with the calculated score
      const showUniversityDto: ShowUniversityDto = {
        id: university.id,
        name: university.name,
        location: university.location,
        description: university.description,
        total_enrollment: university.totalEnrollment,
        min_price: university.minPrice,
        max_price: university.maxPrice,
        university_type: university.universityType as string,
        class_size: university.classSize as string,
        scholarship: university.scholarship as string,
        exchange: university.exchange as string,
        facility: university.facility as string,
        shift: university.shift as string,
        photo_url: university.photoUrl,
        universityMajors: university.universityMajors,
        score: score // Include the score in the DTO
      };

      scoredUniversities.push(showUniversityDto);
    }

    scoredUniversities.sort((a, b) => b.score - a.score); // Sort by score descending
    return scoredUniversities.slice(0, 5); // Return the top 5 scored universities
  }

  parseBudgetRange(budget: string): { min: number; max: number } {
    if (budget.includes("Less than")) {
      const max = parseInt(budget.replace(/\D/g, ""), 10); // Extract number
      return { min: 0, max: max };
    } else if (budget.includes("More than")) {
      const min = parseInt(budget.replace(/\D/g, ""), 10);
      return { min: min, max: Infinity };
    } else {
      const [min, max] = budget.split("-").map(b => parseInt(b.replace(/\D/g, ""), 10));
      return { min, max };
    }
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