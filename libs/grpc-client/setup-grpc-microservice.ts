import {
  Transport,
  MicroserviceOptions,
  GrpcOptions,
} from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { Logger } from 'nestjs-pino';
import { TestingModule } from '@nestjs/testing';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { ServiceName } from './grpc-client.service';

import { GrpcLoggerInterceptor } from './grpc-logger.interceptor';
import { HttpToGrpcExceptionFilter } from './grpc-exception.filter';

export const setupGrpcMicroservice = async (
  appModule: Function,
  serverName: ServiceName,
) => {
  // check that logger module imported in appModule
  // it's important, since in case it's not exists useLogger below won't work and service itself won't start and won't log anything
  // commented since with "createApplicationContext" event emitter fires events twice

  // const appContext = await NestFactory.createApplicationContext(appModule);
  // appContext.get(Logger);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    appModule,
    {
      bufferLogs: true,
      transport: Transport.GRPC,
      options: configByServiceName[serverName],
    },
  );

  app.useGlobalFilters(new HttpToGrpcExceptionFilter());
  app.useGlobalInterceptors(new GrpcLoggerInterceptor(serverName));
  app.useLogger(app.get(Logger));

  await app.listen();
};

export const setupTestGrpcMicroservice = async (
  module: TestingModule,
  serverName: ServiceName,
) => {
  const app = module.createNestApplication(new FastifyAdapter());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: configByServiceName[serverName],
  });

  await app.startAllMicroservices();
  await app.init();

  return app;
};

const configByServiceName: Record<ServiceName, GrpcOptions['options']> = {
  UserService: {
    url: '0.0.0.0:5001',
    protoPath: join(__dirname, '../user-service.proto'),
    package: 'user_service',
  },
  SupplierService: {
    url: process.env.NODE_ENV === 'test' ? 'localhost:5002' : '0.0.0.0:5002',
    protoPath:
      process.env.NODE_ENV === 'test'
        ? join(__dirname, '../../proto/supplier-service.proto')
        : join(__dirname, '../supplier-service.proto'),
    package: 'supplier_service',
  },
};
