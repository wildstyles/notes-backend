import { Module } from '@nestjs/common';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerModule } from '@app/libs/logger/logger.module';

import { DatabaseModule } from './infrastructure/database/database.module';

import {
  CreateUserGrpcController,
  GetUserGrpcController,
} from './infrastructure/controllers';
import { CreateUserHandler, GetUserHandler } from './application';

@Module({
  imports: [
    LoggerModule.forRoot(),
    DatabaseModule,
    EventEmitterModule.forRoot(),
  ],
  providers: [CreateUserHandler, GetUserHandler],
  controllers: [CreateUserGrpcController, GetUserGrpcController],
})
export class AppModule {}
