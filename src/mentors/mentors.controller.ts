import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ClassSerializerInterceptor, UseInterceptors, NotFoundException, BadRequestException, InternalServerErrorException, UploadedFile, Logger } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MentorsService } from './mentors.service';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { Public } from '../decorators/public.decorator';
import { StatusCodes } from 'src/enums/statusCodes';
import { StorageService } from '../students/storage/storage.service';

@Controller('mentors')
@UseInterceptors(ClassSerializerInterceptor)
export class MentorsController {
  private readonly logger = new Logger(MentorsController.name);

  constructor(
    private readonly mentorsService: MentorsService,
    private readonly storageService: StorageService
  ) {}

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

  @Public()
  @Post('/upload-profile-image/:id')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProfileImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      this.logger.log(`Uploading profile image for mentor ${id}`);

      if (!file) {
        throw new BadRequestException('No file uploaded or field name is incorrect. Use "image" as the field name.');
      }
      
      // Validate file type
      if (!file.mimetype.startsWith('image/')) {
        throw new BadRequestException('Only image files are allowed');
      }

      const imageUrl = await this.storageService.uploadFile(file, `mentors/${id}/profile`);
      await this.mentorsService.updateProfileImage(id, imageUrl);
      
      this.logger.log(`Profile image uploaded for mentor ${id}`);
      return { imageUrl };
    } catch (error) {
      this.logger.error(`Error uploading profile image: ${error.message}`, error.stack);

      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to upload image: ${error.message}`);
    }
  }

  @Public()
  @Post('/update-profile-image/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateProfileImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { currentImageUrl?: string }
  ) {
    try {
      this.logger.log(`Updating profile image for mentor ${id}`);

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
        imageUrl = await this.storageService.uploadFile(file, `mentors/${id}/profile`);
      }

      await this.mentorsService.updateProfileImage(id, imageUrl);
      this.logger.log(`Profile image updated for mentor ${id}`);

      return { imageUrl };
    } catch (error) {
      this.logger.error(`Error updating profile image: ${error.message}`, error.stack);

      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to update image: ${error.message}`);
    }
  }
}