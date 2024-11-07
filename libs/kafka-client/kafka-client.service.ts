import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { KafkaClientName } from './kafka-client.module';

export interface IUserServiceController {
  deleteUser(): void;
  createUser(message: any, context: any): any;
}

type ServiceByName = {
  'user-service': IUserServiceController;
};

type TransformService<N extends keyof ServiceByName> = {
  // @ts-ignore
  [K in keyof ServiceByName[N] as `${N}.${K}`]: ServiceByName[N][K] extends (
    ...args: infer P
  ) => infer R
    ? [P[0], R]
    : never;
};

type KafkaSendMethods = TransformService<'user-service'>;

export type KafkaSendMessagePattern = keyof KafkaSendMethods;

export interface IKafkaClientService {
  send: <PatternKey extends KafkaSendMessagePattern>(
    pattern: PatternKey,
    input: KafkaSendMethods[PatternKey][0],
  ) => Observable<KafkaSendMethods[PatternKey][1]>;

  subscribeToResponseOf: (pattern: KafkaSendMessagePattern) => void;
}

@Injectable()
export class KafkaClientService implements IKafkaClientService, OnModuleInit {
  constructor(
    private readonly client: ClientKafka,
    private readonly clientName: KafkaClientName,
  ) {}

  public send<PatternKey extends KafkaSendMessagePattern>(
    pattern: PatternKey,
    data: KafkaSendMethods[PatternKey][0],
  ): Observable<KafkaSendMethods[PatternKey][1]> {
    return this.client.send<KafkaSendMethods[PatternKey][1]>(pattern, data);
  }

  public subscribeToResponseOf(pattern: KafkaSendMessagePattern): void {
    return this.client.subscribeToResponseOf(pattern);
  }

  onModuleInit() {
    subscribeToResponseOfByClientName[this.clientName].forEach((pattern) => {
      this.subscribeToResponseOf(pattern);
    });
  }
}

const subscribeToResponseOfByClientName: Record<
  KafkaClientName,
  KafkaSendMessagePattern[]
> = {
  gateway: ['user-service.createUser'],
  user: [],
};
