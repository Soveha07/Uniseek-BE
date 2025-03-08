import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateBookingDto {
    @IsNotEmpty()
    student_id: string;

    @IsInt()
    @IsNotEmpty()
    mentor_id: number;

    @IsString()
    @IsNotEmpty()
    day: string;

    @IsString()
    @IsNotEmpty()
    time: string;
}
