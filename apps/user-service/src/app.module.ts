import { Module } from '@nestjs/common';

import { LoggerModule } from '@app/libs/logger/logger.module';

import { UserServiceKafkaController } from './user-service.kafka.controller';
import { UserServiceGrpcController } from './user-service.grpc.controller';

@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [UserServiceKafkaController, UserServiceGrpcController],
})
export class AppModule {}
