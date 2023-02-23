import { HttpException, HttpStatus } from '@nestjs/common';

export class NotAcceptableException extends HttpException {
  constructor(message = 'not acceptable') {
    super(
      { message: [message], error: 'not acceptable' },
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}

export class EntityNotFoundException extends HttpException {
  constructor(message = 'entity not found') {
    super(
      {
        message: [message],
        error: 'entity not found',
        statusCode: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class ResourceUnauthorisedException extends HttpException {
  constructor(message = 'unauthorised') {
    super(
      {
        message: [message],
        error: 'unauthorised',
        statusCode: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
