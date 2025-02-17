import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from 'src/role.enum';

export class CreateStudentGoogleDto {
    displayName: string;

    provider: string

    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    photoURL: string;

    createdAt: Date;

    role: Role = Role.Student;
}
