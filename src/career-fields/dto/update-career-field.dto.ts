import { PartialType } from '@nestjs/mapped-types';
import { CreateCareerFieldDto } from './create-career-field.dto';

export class UpdateCareerFieldDto extends PartialType(CreateCareerFieldDto) {}
