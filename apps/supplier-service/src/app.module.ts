import { Module, Provider } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerModule } from '@app/libs';

import { DatabaseModule } from './database/database.module';

import {
  CreateSupplierGrpcController,
  CreateSupplyGrpcController,
  CreateSupplierHandler,
  CreateSupplyHandler,
} from './commands';

import { SupplierCreatedEventHandler } from './domain-event-handlers';

const grpcControllers = [
  CreateSupplierGrpcController,
  CreateSupplyGrpcController,
];

const domainEventHandlers: Provider[] = [SupplierCreatedEventHandler];

const commandHandlers: Provider[] = [
  CreateSupplierHandler,
  CreateSupplyHandler,
];

@Module({
  imports: [
    LoggerModule.forRoot(),
    EventEmitterModule.forRoot(),
    DatabaseModule,
  ],
  providers: [...commandHandlers, ...domainEventHandlers],
  controllers: [...grpcControllers],
})
export class AppModule {}
