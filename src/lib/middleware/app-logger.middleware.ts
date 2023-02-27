import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

import { stringUtils } from '../utils';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: FastifyRequest, res: FastifyReply, next: () => void): void {
    const { ip, method, originalUrl } = req as any;
    const userAgent = req.headers['user-agent'] || '';

    (res as any).on('finish', () => {
      const { statusCode } = res;
      // Only log for 1 % if url has `health`
      if (
        !stringUtils.isEmpty(originalUrl) &&
        originalUrl.includes('health') &&
        Math.random() > 0.01
      ) {
        return;
      }

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} - ${userAgent} - ${ip}`,
      );
    });

    next();
  }
}
