import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR; // Default to 500 Internal Server Error
        let message = 'Internal server error';
        let errorCode: string | undefined; // Optional error code

        // Handle HttpException (including custom exceptions)
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            // Extract message and errorCode from the exception response
            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            } else {
                message = (exceptionResponse as any).message || 'An error occurred';
                errorCode = (exceptionResponse as any).errorCode; // Extract errorCode if it exists
            }
        }
        // Handle TypeORM QueryFailedError
        else if (exception instanceof QueryFailedError) {
            status = HttpStatus.BAD_REQUEST; // 400 Bad Request
            message = 'Database query failed';
        }
        // Handle other errors (e.g., unexpected errors)
        else if (exception instanceof Error) {
            message = exception.message || 'An unexpected error occurred';
            errorCode = (exception as any).errorCode; // Extract errorCode if it exists
        }

        // Construct the response object
        const responseBody: any = {
            status: status,
            timestamp: new Date().toISOString(),
            message: message,
        };

        // Add errorCode to the response if it exists
        if (errorCode) {
            responseBody.errorCode = errorCode;
        }

        // Send the response
        response.status(status).json(responseBody);
    }
}