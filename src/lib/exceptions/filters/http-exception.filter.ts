import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const message = exception.message;
    const error = exception.message;
    const status = exception.getStatus();

    this.logger.error(exception);

    response.status(status).send({
      message: Array.isArray(message) ? message : [message],
      error: error,
      statusCode: status,
    });
  }
}
