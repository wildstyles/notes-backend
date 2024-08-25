import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { IUserServiceController } from '@app/user-service/user-service.controller';

type ServiceByName = {
  'user-service': IUserServiceController;
};

type TransformService<N extends keyof ServiceByName> = {
  [K in keyof ServiceByName[N] as `${N}.${K}`]: ServiceByName[N][K] extends (
    ...args: any
  ) => any
    ? [Parameters<ServiceByName[N][K]>, ReturnType<ServiceByName[N][K]>]
    : ServiceByName[N][K];
};

type KafkaSendMethods = TransformService<'user-service'>;

export type KafkaSendMessagePattern = keyof KafkaSendMethods;

export interface IKafkaClientService {
  send: <PatternKey extends KafkaSendMessagePattern>(
    pattern: PatternKey,
    input: KafkaSendMethods[PatternKey][0][0],
  ) => Observable<KafkaSendMethods[PatternKey][1]>;

  subscribeToResponseOf: (pattern: KafkaSendMessagePattern) => void;
}

@Injectable()
export class KafkaClientService implements IKafkaClientService {
  constructor(private readonly client: ClientKafka) {}

  public send<PatternKey extends KafkaSendMessagePattern>(
    pattern: PatternKey,
    data: KafkaSendMethods[PatternKey][0][0],
  ) {
    return this.client.send<KafkaSendMethods[PatternKey][1]>(pattern, data);
  }

  public subscribeToResponseOf(pattern: KafkaSendMessagePattern) {
    return this.client.subscribeToResponseOf(pattern);
  }
}
