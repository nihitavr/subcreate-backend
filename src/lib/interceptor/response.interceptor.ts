import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((responseData) => {
        const data = responseData
          ? responseData?.data
            ? responseData
            : { data: responseData }
          : {};

        data.statusCode = response.statusCode;

        if (data.statusCode == 202 || data.statusCode == 204) {
          data.message = 'success';
        }

        return data;
      }),
    );
  }
}
