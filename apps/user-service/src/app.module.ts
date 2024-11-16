import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';





import { CreateUserHandler, GetUserHandler } from './application';
import { LoggerModule } from '@repo/common/logger';

import {
  CreateUserGrpcController,
  GetUserGrpcController,
} from './infrastructure/controllers';
import { DatabaseModule } from './infrastructure/database/database.module';

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
