import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { ShowUniversityDto } from './dto/show-university.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('/universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) { }

  // @Post()
  // create(@Body() createUniversityDto: CreateUniversityDto) {
  //   return this.universitiesService.create(createUniversityDto);
  // }

  @Public()
  @Get()
  findAll(): Promise<ShowUniversityDto[]> {
    return this.universitiesService.findAll();
  }

  // @Public()
  // @Get('/:id')
  // async findOne(@Param('id') id: number): Promise<ShowUniversityDto> {
  //   return await this.universitiesService.findOne(id);
  // }

  @Public()
  @Get('/:id')
  async getMajors(@Param('id') id: number) {
    return this.universitiesService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUniversityDto: UpdateUniversityDto) {
  //   return this.universitiesService.update(+id, updateUniversityDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.universitiesService.remove(+id);
  // }
}
