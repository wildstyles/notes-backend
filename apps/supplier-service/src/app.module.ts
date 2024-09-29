import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerModule } from '@app/libs';

import { DatabaseModule } from './database';

import {
  CreateSupplierGrpcController,
  CreateSupplyGrpcController,
  CreateSupplierHandler,
  CreateSupplyHandler,
} from './commands';

const grpcControllers = [
  CreateSupplierGrpcController,
  CreateSupplyGrpcController,
];

const commandHandlers = [CreateSupplierHandler, CreateSupplyHandler];

@Module({
  imports: [CqrsModule, LoggerModule.forRoot(), DatabaseModule],
  providers: [...commandHandlers],
  controllers: [...grpcControllers],
})
export class AppModule {}
