import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { GrpcClientModule } from '@repo/common/grpc-client';

import {
  CreateSupplierHandler,
  CreateSupplierHttpController,
  CreateSupplierSaga,
} from './create-supplier';
import {
  CreateSupplyHandler,
  CreateSupplyHttpController,
} from './create-supply';

const sagas = [CreateSupplierSaga];

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
  providers: [...sagas, ...commandHandlers],
})
export class SupplierModule {}
