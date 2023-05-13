import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { stringUtils } from '../utils';
import { Request, Response, response } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: () => void): void {
    const { ip, method, originalUrl: url } = req;
    const userAgent = req.headers['user-agent'] || '';

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      // Only log for 1 % if url has `health`
      if (
        !stringUtils.isEmpty(url) &&
        url.includes('health') &&
        Math.random() > 0.01
      ) {
        return;
      }

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
