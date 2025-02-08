import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateStudentDto {
    username: string;

    // phone_number: string;

    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}