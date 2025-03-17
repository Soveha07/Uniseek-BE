import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) { }

  @Post()
  addRating(@Body() dto: CreateRatingDto) {
    return this.ratingsService.addRating(dto);
  }

  @Get(':mentorId')
  getRatings(@Param('mentorId') mentorId: number) {
    return this.ratingsService.getRatingsByMentor(mentorId);
  }
}
