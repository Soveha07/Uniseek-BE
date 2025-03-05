import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CareerFieldsService } from './career-fields.service';
import { CreateCareerFieldDto } from './dto/create-career-field.dto';
import { UpdateCareerFieldDto } from './dto/update-career-field.dto';

@Controller('career-fields')
export class CareerFieldsController {
  constructor(private readonly careerFieldsService: CareerFieldsService) {}

  @Post()
  create(@Body() createCareerFieldDto: CreateCareerFieldDto) {
    return this.careerFieldsService.create(createCareerFieldDto);
  }

  @Get()
  findAll() {
    return this.careerFieldsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.careerFieldsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCareerFieldDto: UpdateCareerFieldDto) {
    return this.careerFieldsService.update(+id, updateCareerFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.careerFieldsService.remove(+id);
  }
}
