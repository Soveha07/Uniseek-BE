import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from 'src/role.enum';

export class CreateStudentGoogleDto {
    username: string;

    provider: string

    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    profile_url: string;

    created_at: Date;

    role: Role = Role.Student;
}
