import { Module, Provider } from '@nestjs/common';
import { LoggerModule } from '@app/libs';

import { DatabaseModule } from './database/database.module';

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

const commandHandlers: Provider[] = [
  CreateSupplierHandler,
  CreateSupplyHandler,
];

@Module({
  imports: [LoggerModule.forRoot(), DatabaseModule],
  providers: [...commandHandlers],
  controllers: [...grpcControllers],
})
export class AppModule {}
