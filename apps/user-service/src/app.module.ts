import { Module } from '@nestjs/common';
import { UserServiceKafkaController } from './user-service.kafka.controller';
import { UserServiceGrpcController } from './user-service.grpc.controller';

@Module({
  controllers: [UserServiceKafkaController, UserServiceGrpcController],
})
export class AppModule {}
