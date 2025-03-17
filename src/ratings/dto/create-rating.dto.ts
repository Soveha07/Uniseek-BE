import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
    @IsInt()
    mentorId: number;

    studentId: string;

    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsOptional()
    @IsString()
    review?: string;
}
