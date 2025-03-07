import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { University } from './entities/university.entity';
import { ShowUniversityDto } from './dto/show-university.dto';

@Injectable()
export class UniversitiesService {
  constructor(
    @InjectRepository(University)
    private universitiesRepository: Repository<University>,
  ) {}

  async create(createUniversityDto: CreateUniversityDto): Promise<University> {
    const university = this.universitiesRepository.create(createUniversityDto);
    return await this.universitiesRepository.save(university);
  }

  async findAll(): Promise<ShowUniversityDto[]> {
    try {
      const universities = await this.universitiesRepository.find();
      return universities.map(uni => ({
        id: uni.id,
        name: uni.name,
        location: uni.location,
        description: uni.description,
        total_enrollment: uni.total_enrollment,
        min_price: uni.min_price,
        max_price: uni.max_price,
        university_type: uni.university_type,
        class_size: uni.class_size,
        scholarship: uni.scholarship,
        exchange: uni.exchange,
        facility: uni.facility,
        shift: uni.shift,
        photo_url: uni.photo_url,
      }));
    } catch (error) {
      console.error('Error fetching universities:', error);
      return []; 
    }
  }

  async findOne(id: number): Promise<University> {
    const university = await this.universitiesRepository.findOneBy({ id });
    
    if (!university) {
      throw new NotFoundException(`University with ID ${id} not found`);
    }
    
    return university;
  }

  async update(id: number, updateUniversityDto: UpdateUniversityDto): Promise<University> {
    const result = await this.universitiesRepository.update(id, updateUniversityDto);
    
    if (result.affected === 0) {
      throw new NotFoundException(`University with ID ${id} not found`);
    }
    
    return this.universitiesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const result = await this.universitiesRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`University with ID ${id} not found`);
    }
  }
  
  // Helper method to map entity to DTO
  private mapToShowDto(university: University): ShowUniversityDto {
    return {
      id: university.id,
      name: university.name,
      location: university.location,
      description: university.description,
      total_enrollment: university.total_enrollment,
      min_price: university.min_price,
      max_price: university.max_price,
      university_type: university.university_type,
      class_size: university.class_size,
      scholarship: university.scholarship,
      exchange: university.exchange,
      facility: university.facility,
      shift: university.shift,
      photo_url: university.photo_url,
    };
  }
}
