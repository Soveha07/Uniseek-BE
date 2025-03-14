import { HttpException, HttpStatus } from '@nestjs/common';
import { StatusCodes } from 'src/enums/statusCodes';

export class NoPhoneNumberException extends HttpException {
    constructor() {
        super(
            {
                status: HttpStatus.BAD_REQUEST,
                message: 'Phone number is required',
                errorCode: StatusCodes.NoPhoneNumber, // Custom error code
            },
            HttpStatus.BAD_REQUEST,
        );
    }
}