import { ExceptionFilter, Catch, ArgumentsHost, HttpException, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = 500;
        let message = 'Internal server error';

        // If the error is an instance of HttpException, use its status and message
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const responseMessage = exception.getResponse();
            message = typeof responseMessage === 'string' ? responseMessage : (responseMessage as any).message || 'An error occurred';
        }
        // If the error is a QueryFailedError from TypeORM, return a proper error message
        else if (exception instanceof QueryFailedError) {
            status = 400; // Bad Request
            message = (exception as any).message || 'Database query failed';
        }

        response.status(status).json({
            status: 'error',
            timestamp: new Date(new Date().toISOString()).toLocaleString(),
            message: typeof message === 'string' ? message : (message as any).message || 'An error occurred',
        });
    }
}
