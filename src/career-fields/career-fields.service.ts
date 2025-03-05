import { Injectable } from '@nestjs/common';
import { CreateCareerFieldDto } from './dto/create-career-field.dto';
import { UpdateCareerFieldDto } from './dto/update-career-field.dto';

@Injectable()
export class CareerFieldsService {
  create(createCareerFieldDto: CreateCareerFieldDto) {
    return 'This action adds a new careerField';
  }

  findAll() {
    return `This action returns all careerFields`;
  }

  findOne(id: number) {
    return `This action returns a #${id} careerField`;
  }

  update(id: number, updateCareerFieldDto: UpdateCareerFieldDto) {
    return `This action updates a #${id} careerField`;
  }

  remove(id: number) {
    return `This action removes a #${id} careerField`;
  }
}
