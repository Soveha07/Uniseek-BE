import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { SurveyResponsesService } from './survey-responses.service';
import { CreateSurveyResponseDto } from './dto/create-survey-response.dto';
import { UpdateSurveyResponseDto } from './dto/update-survey-response.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('survey-responses')
export class SurveyResponsesController {
  constructor(private readonly surveyResponsesService: SurveyResponsesService) { }

  @Public()
  @Post()
  async createSurveyResponse(@Body() createSurveyResponseDto: CreateSurveyResponseDto) {
    try {
      return await this.surveyResponsesService.createSurveyResponse(createSurveyResponseDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  findAll() {
    return this.surveyResponsesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveyResponsesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSurveyResponseDto: UpdateSurveyResponseDto) {
    return this.surveyResponsesService.update(+id, updateSurveyResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveyResponsesService.remove(+id);
  }
}
