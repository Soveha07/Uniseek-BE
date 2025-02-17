import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Public } from 'src/decorators/public.decorator';

@Controller('/student')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @Public()
  @Post('/create')
  async create(@Body() createStudentDto: CreateStudentDto) {
    try {
      return this.studentsService.createEndUser(createStudentDto);
    }
    catch (error) {
      throw new Error(error);
    }
  }

  @Post('/update/:id')
  async update(@Param("id") id: string, @Body() body: { username: string; phoneNumber: string }) {
    return this.studentsService.updateStudent(id, body.username, body.phoneNumber);
  }


  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') uid: string): Promise<Student> {
    return this.studentsService.findById(uid);
  }


  @Delete(':id')
  async deleteStudent(@Param('id') id: string): Promise<void> {
    await this.studentsService.deleteStudent(id);
  }

}
