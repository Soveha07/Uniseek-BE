import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { GlobalExceptionFilter } from './filters/exception.filter';

// Load the appropriate .env file based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cors for api
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:3008'],  
    methods: 'GET,POST,PATCH,DELETE',
    credentials: true
  });
  

  // Apply Global Interceptor & Exception Filter
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(port);

  Logger.log(`🚀 Server is now running on port ${port}`);
}
bootstrap();
