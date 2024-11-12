import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport, ClientKafka } from '@nestjs/microservices';

import { KafkaClientService } from './kafka-client.service';

export type KafkaClientName = 'gateway' | 'user';

@Module({})
export class KafkaClientModule {
  public static forRoot(name: KafkaClientName): DynamicModule {
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
          useFactory: (kafkaClient: ClientKafka) =>
            new KafkaClientService(kafkaClient, name),
          inject: [name],
        },
      ],
    };
  }
}
