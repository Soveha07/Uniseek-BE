import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { config } from 'dotenv';

// Load environment variables
// dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
dotenv.config({ path: '.env.local' });

// Create a ConfigService instance to read env variables
const configService = new ConfigService();

console.log(configService.get<string>('POSTGRES_PORT'));
export const dataSource = new DataSource({
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: configService.get<number>('POSTGRES_PORT'),
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DATABASE'),
    synchronize: false,
    logging: true,
    entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    migrationsTableName: 'migrations',
    ssl: {
        ca: configService.get<string>("POSTGRES_SSL_CA_PATH"),
    },

    // type: 'postgres',
    // host: "localhost",
    // port: 5432,
    // username: "postgres",
    // password: "Veha10042003",
    // database: "postgres",
    // schema: "test",
    // synchronize: false,
    // logging: true,
    // entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
    // migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    // migrationsTableName: 'migrations',

});

dataSource
    .initialize()
    .then(() => console.log('✅ Database connected successfully'))
    .catch((error) => {
        console.error('❌ Database connection error:', error);
        process.exit(1); // Ensures app exits on DB failure
    });
