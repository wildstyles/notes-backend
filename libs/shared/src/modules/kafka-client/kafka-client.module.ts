import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport, ClientKafka } from '@nestjs/microservices';

import { KafkaClientService } from './kafka-client.service';

export enum KAFKA_CLIENT_NAME {
  GATEWAY = 'gateway',
  USER = 'user',
}

@Module({})
export class KafkaClientModule {
  public static forRoot(name: KAFKA_CLIENT_NAME): DynamicModule {
    return {
      imports: [
        ClientsModule.register([
          {
            name,
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: name,
                brokers: ['kafka:9092'],
              },
              consumer: {
                groupId: name,
              },
            },
          },
        ]),
      ],
      module: KafkaClientModule,
      exports: [KafkaClientService],
      providers: [
        {
          provide: KafkaClientService,
          useFactory: (client: ClientKafka) => new KafkaClientService(client),
          inject: [name],
        },
      ],
    };
  }
}
