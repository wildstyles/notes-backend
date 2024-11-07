import { Module, Provider } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerModule } from '@app/libs';

import { DatabaseModule } from './infrastructure/database/database.module';

import {
  CreateSupplierHandler,
  CreateSupplyHandler,
  SupplierCreatedEventHandler,
} from './application';

import {
  CreateSupplierGrpcController,
  CreateSupplyGrpcController,
} from './infrastructure/controllers';

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
