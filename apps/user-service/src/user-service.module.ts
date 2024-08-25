import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';

@Module({
  controllers: [UserServiceController],
})
export class UserServiceModule {}
