import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { KafkaClientModule } from '@app/shared';

@Module({
  // imports: [KafkaClientModule],
  controllers: [UserServiceController],
})
export class UserServiceModule {}
