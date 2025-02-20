import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from 'src/role.enum';

export class CreateStudentDto {
    username: string;

    phone_number: string;

    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    role: Role = Role.Student;
}