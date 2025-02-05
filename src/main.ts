import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

// Load the appropriate .env file based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cors for api
  app.enableCors();

  await app.listen(port);

  Logger.log(`🚀 Server is now running on port ${port}`);
}
bootstrap();
