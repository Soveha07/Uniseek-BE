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

// Read SSL certificate properly
const sslCert = configService.get<string>('POSTGRES_SSL_CA_PATH')?.replace(/\\n/g, '\n');

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
    // host: process.env.POSTGRES_HOST,
    // port: Number(process.env.POSTGRES_PORT),
    // username: process.env.POSTGRES_USER,
    // password: process.env.POSTGRES_PASSWORD,
    // database: process.env.POSTGRES_DATABASE,
    // synchronize: false, // Set to true only in development
    // logging: true, // Enables SQL query logging
    // entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
    // migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    // migrationsTableName: 'migrations',
    // // ssl: sslCert ? { ca: sslCert, rejectUnauthorized: true } : undefined, // Handles SSL
    // ssl: {
    //     ca: process.env.POSTGRES_SSL_CA_PATH,
    // },
});

dataSource
    .initialize()
    .then(() => console.log('✅ Database connected successfully'))
    .catch((error) => {
        console.error('❌ Database connection error:', error);
        process.exit(1); // Ensures app exits on DB failure
    });
