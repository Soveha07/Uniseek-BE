import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { StatusCodes } from 'src/enums/statusCodes';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => ({
                status: StatusCodes.Success,
                timestamp: new Date(new Date().toISOString()).toLocaleString(),
                data: data
            }))
        );
    }
}
