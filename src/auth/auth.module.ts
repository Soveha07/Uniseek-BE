import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StudentsModule } from 'src/students/students.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    forwardRef(() => StudentsModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '60d' },
      }),
      inject: [ConfigService],
    }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, ConfigModule],
  exports: [AuthService, JwtModule]
})
export class AuthModule { }
