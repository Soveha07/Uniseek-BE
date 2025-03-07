import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUniversityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  total_enrollment?: number;

  @IsNotEmpty()
  @IsNumber()
  min_price: number;

  @IsNotEmpty()
  @IsNumber()
  max_price: number;

  @IsNotEmpty()
  @IsString()
  university_type: string;

  @IsOptional()
  @IsString()
  class_size?: string;

  @IsOptional()
  @IsBoolean()
  scholarship?: boolean;

  @IsOptional()
  @IsBoolean()
  exchange?: boolean;

  @IsOptional()
  @IsString()
  facility?: string;

  @IsOptional()
  @IsString()
  shift?: string;

  @IsOptional()
  @IsString()
  photo_url?: string;
}
