import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { ShowUniversityDto } from './dto/show-university.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Public()
  @Get()
  findAll(): Promise<ShowUniversityDto[]> {
    return this.universitiesService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('relations') relations?: string
  ): Promise<ShowUniversityDto> {
    console.log(`Received request for university ${id} with relations: ${relations}`);
 
    const relationsArray = relations ? relations.split(',') : [];
    console.log('Relations array:', relationsArray);
    
    const universityDto = await this.universitiesService.findOne(id, relationsArray);

    console.log('Controller response has universityMajors:', !!universityDto.universityMajors);
    if (universityDto.universityMajors) {
      console.log(`Controller response universityMajors length: ${universityDto.universityMajors.length}`);
    }
    
    return universityDto;
  }

  @Post()
  create(@Body() createUniversityDto: CreateUniversityDto) {
    return this.universitiesService.create(createUniversityDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateUniversityDto: UpdateUniversityDto
  ) {
    return this.universitiesService.update(id, updateUniversityDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.universitiesService.remove(id);
  }
}
