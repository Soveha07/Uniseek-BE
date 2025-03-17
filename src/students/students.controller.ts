import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Public } from 'src/decorators/public.decorator';
import { StorageService } from './storage/storage.service';

@Controller('/student')
export class StudentsController {
  private readonly logger = new Logger(StudentsController.name);
  constructor(
    private readonly studentsService: StudentsService,
    private readonly storageService: StorageService,
  ) { }

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

  @Post('/update/:uid')
  async update(@Param("uid") uid: string, @Body() body: { username: string; phoneNumber: string }) {
    return this.studentsService.updateStudent(uid, body.username, body.phoneNumber);
  }

  @Post('/update-password/:uid')
  async updatePass(@Param("uid") uid: string, @Body() body: { newPassword: string, currentPassword?: string }) {
    return this.studentsService.updatePassword(uid, body.newPassword, body.currentPassword);
  }

  @Public()
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('/:uid')
  async findById(@Param('uid') uid: string): Promise<Student> {
    return this.studentsService.findById(uid);
  }

  @Delete(':uid')
  async deleteStudent(@Param('uid') uid: string): Promise<void> {
    await this.studentsService.deleteStudent(uid);
  }

  @Post('/upload-profile-image/:uid')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProfileImage(
    @Param('uid') uid: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      const imageUrl = await this.storageService.uploadFile(file, `students/${uid}/profile`);
      await this.studentsService.updateProfileImage(uid, imageUrl);

      return { imageUrl };
    } catch (error) {
    }
  }

  @Post('/update-profile-image/:uid')
  @UseInterceptors(FileInterceptor('image'))
  async updateProfileImage(
    @Param('uid') uid: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { currentImageUrl?: string }
  ) {
    try {
      this.logger.log(`Updating profile image for student ${uid}`);

      if (!file) {
        throw new BadRequestException('No file uploaded or field name is incorrect. Use "image" as the field name.');
      }
      // Validate file type
      if (!file.mimetype.startsWith('image/')) {
        throw new BadRequestException('Only image files are allowed');
      }

      let imageUrl: string;

      if (body.currentImageUrl) {
        this.logger.debug(`Current image URL: ${body.currentImageUrl}`);
        const key = this.storageService.extractKeyFromUrl(body.currentImageUrl);
        imageUrl = await this.storageService.updateFile(file, key);
      } else {
        this.logger.debug('No current image URL provided, uploading as new image');
        imageUrl = await this.storageService.uploadFile(file, `students/${uid}/profile`);
      }

      await this.studentsService.updateProfileImage(uid, imageUrl);
      this.logger.log(`Profile image updated for student ${uid}`);

      return { imageUrl };
    } catch (error) {
      this.logger.error(`Error updating profile image: ${error.message}`, error.stack);

      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to update image: ${error.message}`);
    }
  }

  /*
  JUST TESTING COMPONENTS STUFF
  */

  // @Public()
  // @Get('/test-space-config')
  // testSpaceConfig() {
  //   return {
  //     region: this.storageService['region'],
  //     endpoint: this.storageService['endpoint'],
  //     bucket: this.storageService['bucket'],
  //     fullUrl: `https://${this.storageService['bucket']}.${this.storageService['endpoint']}/example/path.jpg`,
  //   };
  // }

  // @Public()
  // @Post('/test-db-update/:uid')
  // async testDbUpdate(@Param('uid') uid: string) {
  //   const testUrl = "https://test-url.com/image.jpg";
  //   const updatedStudent = await this.studentsService.updateProfileImage(uid, testUrl);
  //   return {
  //     before: "Before update",
  //     after: updatedStudent,
  //     success: updatedStudent.photoURL === testUrl
  //   };
  // }
}
