import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { University } from './entities/university.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShowUniversityDto } from './dto/show-university.dto';

@Injectable()
export class UniversitiesService {

  constructor(
    @InjectRepository(University)
    private universityRepo: Repository<University>,
  ) { }

  create(createUniversityDto: CreateUniversityDto) {
    return 'This action adds a new university';
  }

  async findAll(): Promise<ShowUniversityDto[]> {
    const universities = await this.universityRepo.find();
    return universities.map(university => {
      const showUniversityDto = new ShowUniversityDto();
      showUniversityDto.id = university.id;
      showUniversityDto.name = university.name;
      showUniversityDto.location = university.location;
      showUniversityDto.description = university.description;
      showUniversityDto.minPrice = university.minPrice;
      showUniversityDto.maxPrice = university.maxPrice;
      showUniversityDto.type = university.universityType;
      return showUniversityDto;
    });
  }

  // async findOne(id: number): Promise<ShowUniversityDto> {
  //   const university = await this.universityRepo.findOneBy({ id });
  //   if (!university) {
  //     throw new NotFoundException(`University with ID ${id} not found`);
  //   }
  //   const showUniversityDto = new ShowUniversityDto();
  //   showUniversityDto.id = university.id;
  //   showUniversityDto.name = university.name;
  //   showUniversityDto.location = university.location;
  //   showUniversityDto.description = university.description;
  //   showUniversityDto.minPrice = university.minPrice;
  //   showUniversityDto.maxPrice = university.maxPrice;
  //   showUniversityDto.type = university.universityType;
  //   return showUniversityDto;
  // }

  async findOne(universityId: number) {
    return this.universityRepo.findOne({
      where: { id: universityId },
      relations: ['universityMajors', 'universityMajors.major'],
    });
  }

  update(id: number, updateUniversityDto: UpdateUniversityDto) {
    return `This action updates a #${id} university`;
  }

  remove(id: number) {
    return `This action removes a #${id} university`;
  }
}
