import { IsString, IsOptional, IsEmail, IsInt, MinLength, MaxLength } from 'class-validator';

export class CreateMentorDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  full_name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsString()
  @IsOptional()
  profile_url?: string;

  @IsInt()
  @IsOptional()
  university_id?: number;

  @IsInt()
  @IsOptional()
  major_id?: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsOptional()
  telegram_link?: string;
}