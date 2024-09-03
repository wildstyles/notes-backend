import {
  Transport,
  MicroserviceOptions,
  KafkaOptions,
} from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';

import { KafkaClientName } from './kafka-client.module';

type KafkaServerName = Exclude<KafkaClientName, 'gateway'>;

export const createKafkaMicroservice = async (
  appModule: Function,
  serverName: KafkaServerName,
) => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    appModule,
    {
      transport: Transport.KAFKA,
      options: configByServiceName[serverName],
    },
  );

  await app.listen();
};

const configByServiceName: Record<KafkaServerName, KafkaOptions['options']> = {
  user: {
    client: {
      clientId: 'user',
      brokers: ['kafka:9092'],
    },
    consumer: {
      groupId: 'user',
    },
  },
};
