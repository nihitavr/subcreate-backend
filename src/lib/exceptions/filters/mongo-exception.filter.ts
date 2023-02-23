import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(MongoExceptionFilter.name);

  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.code === 11000 ? 409 : 500;
    const message = exception.message;

    this.logger.error(message);

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
