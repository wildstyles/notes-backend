import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  USER_SERVICE_NAME,
  UserServiceClient,
} from './interfaces/user-service';

const services = [USER_SERVICE_NAME] as const;

export type ServiceName = (typeof services)[number];

type ServiceClientByName = {
  [USER_SERVICE_NAME]: UserServiceClient;
};

@Injectable()
export class GrpcClientService<
  T extends ServiceName,
  S = ServiceClientByName[T],
> implements OnModuleInit
{
  public methods: S;

  constructor(
    private readonly client: ClientGrpc,
    private readonly serviceName: T,
  ) {}

  onModuleInit() {
    this.methods = this.client.getService<S>(this.serviceName);
  }
}
