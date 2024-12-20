import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SERVICE_ID } from './config/service.config';
import { MongoExceptionFilter } from './lib/exceptions/filters/mongo-exception.filter';
import { ResponseTransformInterceptor } from './lib/interceptor/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpsConfig } from './config/https.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  app.setGlobalPrefix(`api/${SERVICE_ID}/v1`);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalInterceptors(new ResponseTransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Subcreate Service')
    .setDescription('Subcreate Service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(HttpsConfig.port);
  Logger.log(`Server started on port ${HttpsConfig.port}`);
}
bootstrap();
