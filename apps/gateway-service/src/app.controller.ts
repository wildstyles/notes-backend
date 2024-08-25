import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { KafkaClientService } from '@app/shared';

@Controller()
export class AppController implements OnModuleInit {
  constructor(private readonly kafkaClientService: KafkaClientService) {}

  @Get('kafka-test')
  async testKafka() {
    const result = this.kafkaClientService.send('user-service.createUser', {
      password: 'sdf',
      username: 'sdf',
    });

    return result;
  }

  onModuleInit() {
    this.kafkaClientService.subscribeToResponseOf('user-service.createUser');
  }
}
