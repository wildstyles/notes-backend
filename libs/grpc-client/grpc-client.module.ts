import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import {
  ClientsModule,
  Transport,
  GrpcOptions,
  ClientGrpc,
} from '@nestjs/microservices';
import { join } from 'path';
import { USER_SERVICE_PACKAGE_NAME } from './interfaces/user-service';
import { GrpcClientService } from './grpc-client.service';
import { ServiceName } from './grpc-client.service';

const serviceConfigByName: Record<
  ServiceName,
  Required<Pick<GrpcOptions['options'], 'url' | 'package' | 'protoPath'>>
> = {
  UserService: {
    url: 'user-service:5001',
    package: USER_SERVICE_PACKAGE_NAME,
    protoPath: join(__dirname, '../user-service.proto'),
  },
};

@Module({})
export class GrpcClientModule {
  public static forRoot(name: ServiceName): DynamicModule {
    const serviceOptions = serviceConfigByName[name];

    return {
      module: GrpcClientModule,
      exports: [GrpcClientService],
      providers: [
        {
          provide: GrpcClientService,
          useFactory: (client: ClientGrpc) => {
            return new GrpcClientService(client, name);
          },
          inject: [name],
        },
      ],
      imports: [
        ClientsModule.register([
          {
            transport: Transport.GRPC,
            name,
            options: {
              ...serviceOptions,
            },
          },
        ]),
      ],
    };
  }
}
