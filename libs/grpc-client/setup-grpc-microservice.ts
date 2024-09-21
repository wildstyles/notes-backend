import {
  Transport,
  MicroserviceOptions,
  GrpcOptions,
} from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { Logger } from 'nestjs-pino';

import { ServiceName } from './grpc-client.service';

import { GrpcLoggerInterceptor } from './grpc-logger.interceptor';

export const setupGrpcMicroservice = async (
  appModule: Function,
  serverName: ServiceName,
) => {
  const appContext = await NestFactory.createApplicationContext(appModule);
  // check that logger module imported in appModule
  // it's important, since in case it's not exists useLogger below won't work and service itself won't start
  appContext.get(Logger);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    appModule,
    {
      bufferLogs: true,
      transport: Transport.GRPC,
      options: configByServiceName[serverName],
    },
  );

  app.useGlobalInterceptors(new GrpcLoggerInterceptor(serverName));
  app.useLogger(app.get(Logger));

  await app.listen();
};

const configByServiceName: Record<ServiceName, GrpcOptions['options']> = {
  UserService: {
    url: '0.0.0.0:5001',
    protoPath: join(__dirname, '../user-service.proto'),
    package: 'user_service',
  },
  SupplierService: {
    url: '0.0.0.0:5002',
    protoPath: join(__dirname, '../supplier-service.proto'),
    package: 'supplier_service',
  },
};
