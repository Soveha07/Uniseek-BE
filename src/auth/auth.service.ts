import { forwardRef, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { StudentsService } from 'src/students/students.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => StudentsService))
        private readonly studentService: StudentsService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const student = await this.studentService.findByEmail(email);

        if (!student) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (student.password) {
            const isPasswordValid = await bcrypt.compare(password, student.password);

            if (isPasswordValid) {
                const { password, ...result } = student;
                return result;

            }
        }

        const secretKey = this.configService.get<string>("JWT_SECRET_KEY");
        const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
        const hashBase = `${email}${secretKey}${currentDate}`;
        console.log("hashBase", hashBase);
        const generatedHash = crypto.createHash('md5').update(hashBase).digest('hex');
        console.log("generatedHash", generatedHash);

        if (password === generatedHash) {
            const { password, ...result } = student;
            return result;
        }

        throw new UnauthorizedException('Invalid credentials');
    }

    async login(student: any): Promise<{ userId: string, accessToken: string, refreshToken: string }> {
        try {
            console.log('Student data:', student);

            // Ensure tokens are generated successfully
            const tokens = await this.generateTokens(student.email, student.id, student.role);

            // Debugging: log the generated tokens
            console.log('Generated tokens:', tokens);

            // Hash the refresh token and update it in the database
            const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
            await this.studentService.updateRefreshToken(student.uid, hashedRefreshToken);

            // Check if student or student.uid is missing
            if (!student || !student.uid) {
                throw new InternalServerErrorException("Student data is missing");
            }

            // Return the student data along with the access and refresh tokens
            return {
                userId: student.uid,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            };
        } catch (error) {
            console.error('Error during login:', error); // Log the error for debugging
            throw new InternalServerErrorException('An error occurred during login');
        }
    }

    async generateTokens(email: string, sub: string, role: string): Promise<{ accessToken: string, refreshToken: string }> {
        const payload = { email, sub, role }; //sub is studentId
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, { secret: this.configService.get<string>("REFRESH_SECRET_KEY"), expiresIn: '1d' });
        return {
            accessToken,
            refreshToken
        }
    }

    async refreshAccessToken(refreshToken: string, id: string): Promise<{ accessToken: string }> {
        const student = await this.studentService.findById(id);
        if (!student) {
            throw new UnauthorizedException('No student found');
        }

        const isRefreshTokenValid = await bcrypt.compare(refreshToken, student.refresh_token);
        if (!isRefreshTokenValid) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const payload = { email: student.email, sub: student.uid, role: student.role };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }

    async googleLogin(student: any): Promise<{ studentId: number, accessToken: string, refreshToken: string }> {

        const tokens = await this.generateTokens(student.email, student.uid, student.role);

        const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
        await this.studentService.updateRefreshToken(student.uid, hashedRefreshToken);

        return {
            studentId: student.id,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

}
