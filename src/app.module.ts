import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/guards/jwt-guard';
import { GoogleStrategy } from './auth/strategies/google.strategy';

@Module({
  imports: [
    StudentsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [join(__dirname + '/**/*.entity{.ts,.js}')],
        ssl: {
          ca: configService.get<string>("POSTGRES_SSL_CA_PATH"),
        },
      }),
    }),
    StudentsModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    GoogleStrategy
  ],
})
export class AppModule { }
