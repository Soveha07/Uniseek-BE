import { forwardRef, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { StudentsService } from 'src/students/students.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        // @Inject(forwardRef(() => StudentsService))
        private readonly studentService: StudentsService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const student = await this.studentService.findByEmail(email);
        console.log("email", email);
        console.log("password", password);

        if (!student) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (student.password) {
            const isPasswordValid = await bcrypt.compare(password, student.password);

            if (isPasswordValid) {
                const { password, ...result } = student;
                return result;
                console.log(result);
            }
        }

        // const secretKey = this.configService.get<string>("JWT_SECRET_KEY");
        // const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
        // const hashBase = `${email}${secretKey}${currentDate}`;
        // console.log("hashBase", hashBase);
        // const generatedHash = crypto.createHash('md5').update(hashBase).digest('hex');
        // console.log("generatedHash", generatedHash);

        // if (password === generatedHash) {
        //     const { password, ...result } = user;
        //     return result;
        // }

        throw new UnauthorizedException('Invalid credentials');
    }

    async login(student: any): Promise<{ studentId: string, }> {
        console.log(student);
        // const tokens = await this.generateTokens(user.email, user.id, user.role);

        // const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
        // await this.endUserService.updateRefreshToken(user.id, hashedRefreshToken);

        if (!student || !student.uid) {
            throw new InternalServerErrorException("Student data is missing");
        }

        return {
            studentId: student.uid,
            // accessToken: tokens.accessToken,
            // refreshToken: tokens.refreshToken,
        };
    }
}
