import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { TestingModule } from '@nestjs/testing';

import { config } from 'dotenv';
import { Logger } from 'nestjs-pino';
import { join } from 'path';
import * as path from 'path';

import { EnvironmentVariables } from '../config/env.validation';
import { ServiceName } from './grpc-client.service';
import { HttpToGrpcExceptionFilter } from './grpc-exception.filter';
import { GrpcLoggerInterceptor } from './grpc-logger.interceptor';

config({ path: path.join(__dirname, '../../.env') });

const configService = new ConfigService<EnvironmentVariables>();

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
    url: `${configService.getOrThrow('USER_SERVICE_URL')}:${configService.getOrThrow('USER_SERVICE_PORT')}`,
    protoPath: join(__dirname, '../../../../proto/user-service.proto'),
    package: 'user_service',
  },
  SupplierService: {
    url: `${configService.getOrThrow('SUPPLIER_SERVICE_URL')}:${configService.getOrThrow('SUPPLIER_SERVICE_PORT')}`,
    protoPath: join(__dirname, '../../../../proto/supplier-service.proto'),
    package: 'supplier_service',
  },
};
