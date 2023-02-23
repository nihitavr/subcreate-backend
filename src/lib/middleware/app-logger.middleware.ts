import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { request } from 'http';

import { stringUtils } from '../utils';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: FastifyRequest, res: FastifyReply, next: () => void): void {
    const { ip, method, url } = req;
    const userAgent = req.headers['user-agent'] || '';

    res['raw'].on('close', () => {
      const { statusCode } = res;
      const contentLength = req.headers['content-length'];

      // Only log for 1 % if url has `health`
      if (
        !stringUtils.isEmpty(url) &&
        url.includes('health') &&
        Math.random() > 0.01
      ) {
        return;
      }

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} - ${ip}`,
      );
    });

    next();
  }
}
