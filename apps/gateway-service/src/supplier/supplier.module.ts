import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { GrpcClientModule } from '@app/libs/grpc-client';

import {
  CreateSupplierHttpController,
  CreateSupplierHandler,
  CreateSupplyHandler,
  CreateSupplyHttpController,
} from './commands';

const httpControllers = [
  CreateSupplierHttpController,
  CreateSupplyHttpController,
];

const commandHandlers: Provider[] = [
  CreateSupplierHandler,
  CreateSupplyHandler,
];

@Module({
  imports: [CqrsModule, GrpcClientModule.forRoot('SupplierService')],
  controllers: [...httpControllers],
  providers: [...commandHandlers],
})
export class SupplierModule {}
