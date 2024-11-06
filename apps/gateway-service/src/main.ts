import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { setupSwagger } from './common';

import { GrpcExceptionInterceptor } from '@app/libs/grpc-client/grpc-exception.interceptor';
import { AjvValidationPipe } from '@app/libs/validation';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    },
  );

  app.useGlobalPipes(new AjvValidationPipe());
  app.useGlobalInterceptors(new GrpcExceptionInterceptor());
  app.useLogger(app.get(Logger));
  setupSwagger(app);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
