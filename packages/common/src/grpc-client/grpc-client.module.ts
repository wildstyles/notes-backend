import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientGrpc,
  ClientsModule,
  GrpcOptions,
  Transport,
} from '@nestjs/microservices';

import { InterceptingCall, InterceptorOptions, NextCall } from '@grpc/grpc-js';
import { config } from 'dotenv';
import { join } from 'path';

import { EnvironmentVariables } from '../config/env.validation';
import { RequestContextModule } from '../request-context/request-context.module';
import { RequestContext } from '../request-context/request-context.service';
import { GrpcClientService } from './grpc-client.service';
import { ServiceName } from './grpc-client.service';
import { REQUEST_ID_METADATA_KEY } from './grpc-logger.interceptor';

config({ path: join(__dirname, '../../.env') });

const configService = new ConfigService<EnvironmentVariables>();

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
        RequestContextModule,
        ClientsModule.register([
          {
            transport: Transport.GRPC,
            name,
            options: {
              ...serviceOptions,
              channelOptions: {
                interceptors: [
                  (options: InterceptorOptions, nextCall: NextCall) => {
                    return new InterceptingCall(nextCall(options), {
                      start: (metadata, listener, next) => {
                        if (RequestContext.currentContext) {
                          metadata.set(
                            REQUEST_ID_METADATA_KEY,
                            RequestContext.currentContext.req.id,
                          );
                        }

                        next(metadata, listener);
                      },
                    });
                  },
                ],
              },
            },
          },
        ]),
      ],
    };
  }
}

const serviceConfigByName: Record<
  ServiceName,
  Required<Pick<GrpcOptions['options'], 'url' | 'package' | 'protoPath'>>
> = {
  UserService: {
    url: `${configService.getOrThrow('USER_SERVICE_URL')}:${configService.getOrThrow('USER_SERVICE_PORT')}`,
    package: 'user_service',
    protoPath: join(__dirname, '../../../../proto/user-service.proto'),
  },
  SupplierService: {
    url: `${configService.getOrThrow('SUPPLIER_SERVICE_URL')}:${configService.getOrThrow('SUPPLIER_SERVICE_PORT')}`,
    package: 'supplier_service',
    protoPath: join(__dirname, '../../../../proto/supplier-service.proto'),
  },
};
