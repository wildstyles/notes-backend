import {
  Transport,
  MicroserviceOptions,
  GrpcOptions,
} from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';

import { ServiceName } from './grpc-client.service';
import { USER_SERVICE_PACKAGE_NAME } from './interfaces/user-service';

export const createGrpcMicroservice = async (
  appModule: Function,
  serverName: ServiceName,
) => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    appModule,
    {
      transport: Transport.GRPC,
      options: configByServiceName[serverName],
    },
  );

  await app.listen();
};

const configByServiceName: Record<ServiceName, GrpcOptions['options']> = {
  UserService: {
    url: '0.0.0.0:5001',
    protoPath: join(__dirname, '../user-service.proto'),
    package: USER_SERVICE_PACKAGE_NAME,
  },
};
