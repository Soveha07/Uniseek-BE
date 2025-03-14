import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ClassSerializerInterceptor, UseInterceptors, NotFoundException } from '@nestjs/common';
import { MentorsService } from './mentors.service';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { Public } from '../decorators/public.decorator';
import { StatusCodes } from 'src/enums/statusCodes';

@Controller('mentors')
@UseInterceptors(ClassSerializerInterceptor)
export class MentorsController {
  constructor(private readonly mentorsService: MentorsService) { }

  @Public()
  @Post()
  async create(@Body() createMentorDto: CreateMentorDto) {
    const mentor = await this.mentorsService.create(createMentorDto);
    return {
      status: StatusCodes.Success,
      data: mentor
    };
  }

  @Public()
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    const { mentors, total } = await this.mentorsService.findAll(+page, +limit);
    return {
      status: StatusCodes.Success,
      data: mentors,
      total,
      page: +page,
      limit: +limit
    };
  }

  @Public()
  @Get('filter')
  async findByMajorAndUniversity(
    @Query('majorId', ParseIntPipe) majorId: number,
    @Query('universityId', ParseIntPipe) universityId: number
  ) {
    const mentors = await this.mentorsService.findByMajorAndUniversity(majorId, universityId);
    return {
      status: StatusCodes.Success,
      timestamp: new Date().toLocaleString(),
      data: mentors
    };
  }
  
  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const mentor = await this.mentorsService.findOne(id);
    return {
      status: StatusCodes.Success,
      data: mentor
    };
  }

  @Public()
  @Get(':id/schedule')
  async getMentorSchedule(@Param('id', ParseIntPipe) id: number) {
    try {
      const schedule = await this.mentorsService.getMentorSchedule(id);
      
      return {
        status: StatusCodes.Success,
        timestamp: new Date().toLocaleString(),
        data: schedule
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateMentorDto: UpdateMentorDto) {
    const mentor = await this.mentorsService.update(id, updateMentorDto);
    return {
      status: StatusCodes.Success,
      data: mentor
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.mentorsService.remove(id);
    return {
      status: StatusCodes.Success,
      message: `Mentor with ID ${id} has been deleted`
    };
  }
}