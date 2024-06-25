import { Module } from '@nestjs/common';

import { KafkaClientModule, KAFKA_CLIENT_NAME } from '@app/shared';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [KafkaClientModule.forRoot(KAFKA_CLIENT_NAME.GATEWAY)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
