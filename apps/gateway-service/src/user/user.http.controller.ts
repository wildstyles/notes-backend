import { Controller, Post, Get } from '@nestjs/common';
import { GrpcClientService } from '@app/libs/grpc-client/grpc-client.service';
import { KafkaClientService } from '@app/libs';

@Controller('user')
export class UserHttpController {
  constructor(
    private readonly grpcClient: GrpcClientService<'UserService'>,
    private readonly kafkaClient: KafkaClientService,
  ) {}

  @Post()
  async createUser() {
    return this.kafkaClient.send('user-service.createUser', {
      password: 'sdf',
      username: 'sdf',
    });
  }

  @Get()
  async getUser() {
    return this.grpcClient.methods.getUser({ id: '1' });
  }
}
