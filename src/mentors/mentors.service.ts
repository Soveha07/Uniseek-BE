import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { ShowMentorDto } from './dto/show-mentor.dto';
import { Mentor } from './entities/mentor.entity';
import * as bcrypt from 'bcrypt';
import { University } from 'src/universities/entities/university.entity';
import { Major } from 'src/majors/entities/major.entity';

@Injectable()
export class MentorsService {
  constructor(
    @InjectRepository(Mentor)
    private mentorsRepository: Repository<Mentor>,
    @InjectRepository(University)
    private universityRepository: Repository<University>,
    @InjectRepository(Major)
    private majorRepository: Repository<Major>,
  ) { }

  async create(createMentorDto: CreateMentorDto): Promise<Mentor> {
    // Hash password if provided
    if (createMentorDto.password) {
      const salt = await bcrypt.genSalt();
      createMentorDto.password = await bcrypt.hash(createMentorDto.password, salt);
    }

    // Preload related entities
    const university = createMentorDto.university_id
      ? await this.universityRepository.preload({ id: createMentorDto.university_id })
      : null;

    const major = createMentorDto.major_id
      ? await this.majorRepository.preload({ id: createMentorDto.major_id })
      : null;

    // Create Mentor entity
    const mentor = this.mentorsRepository.create({
      ...createMentorDto,
      university,
      major,
    });

    return await this.mentorsRepository.save(mentor);
  }


  async findAll(page: number = 1, limit: number = 10): Promise<{ mentors: Mentor[]; total: number }> {
    console.log(`Finding mentors with page=${page}, limit=${limit}`);

    const skip = (page - 1) * limit;

    console.log(`Using skip=${skip}, take=${limit}`);

    try {
      const [mentors, total] = await this.mentorsRepository.findAndCount({
        relations: ['university', 'major'],
        skip,
        take: limit,
        order: {
          fullName: 'ASC',
        },
      });

      console.log(`Found ${mentors.length} mentors out of ${total} total`);
      console.log('First mentor:', mentors[0]);

      return {
        mentors,
        total,
      };
    } catch (error) {
      console.error('Error finding mentors:', error);
      throw error;
    }
  }

  async findOne(id: number): Promise<ShowMentorDto> {
    const mentor = await this.mentorsRepository.findOne({
      where: { id },
      relations: ['university', 'major'],
    });

    if (!mentor) {
      throw new NotFoundException(`Mentor with ID ${id} not found`);
    }

    return new ShowMentorDto(mentor);
  }


  async update(id: number, updateMentorDto: UpdateMentorDto): Promise<Mentor> {
    if (updateMentorDto.password) {
      const salt = await bcrypt.genSalt();
      updateMentorDto.password = await bcrypt.hash(updateMentorDto.password, salt);
    }

    const result = await this.mentorsRepository.update(id, updateMentorDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Mentor with ID ${id} not found`);
    }

    return this.mentorsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const result = await this.mentorsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Mentor with ID ${id} not found`);
    }
  }

  async findByMajorAndUniversity(majorId: number, universityId: number): Promise<Mentor[]> {
    try {
      const mentors = await this.mentorsRepository.find({
        where: {
          major: { id: majorId },
          university: { id: universityId }
        },
        relations: ['university', 'major']
      });

      return mentors;
    } catch (error) {
      console.error('Error finding mentors by major and university:', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<Mentor | undefined> {
    return this.mentorsRepository.findOne({ where: { email } });
  }

}