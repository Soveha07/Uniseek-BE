import { Module } from '@nestjs/common';
import { CareerFieldsService } from './career-fields.service';
import { CareerFieldsController } from './career-fields.controller';

@Module({
  controllers: [CareerFieldsController],
  providers: [CareerFieldsService],
})
export class CareerFieldsModule {}
