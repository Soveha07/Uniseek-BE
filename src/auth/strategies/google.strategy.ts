import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role.enum';
import { StudentsService } from 'src/students/students.service';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly studentService: StudentsService,
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
            callbackURL: `http://localhost:${configService.get('PORT')}/auth/google/redirect`,
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        console.log("profile", profile);
        const { emails, displayName, photos } = profile;
        const email = emails[0].value;
        const photoUrl = photos && photos[0] ? photos[0].value : '';
        console.log("displayName", displayName);
        console.log("photoUrl", photoUrl);

        let user = await this.studentService.findByEmail(email);

        if (!user) {
            await this.studentService.create({
                email: email,
                provider: 'google',
                displayName: displayName,
                photoURL: photoUrl,
                createdAt: new Date(),
                role: Role.Student,
            });
            user = await this.studentService.findByEmail(email);
        }

        try {
            const { studentId, accessToken: studentAccessToken, refreshToken: studentRefreshToken } = await this.authService.googleLogin(user);
            console.log(user);
            console.log("accessToken", studentAccessToken);
            console.log("refreshToken", studentRefreshToken);
            // Pass student and tokens to done callback
            done(null, { ...user, accessToken: studentAccessToken, refreshToken: studentRefreshToken });
        } catch (e) {
            console.log("error:", e);
            done(e, null)
        }
    }
}
