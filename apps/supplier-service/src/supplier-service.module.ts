import { Module } from '@nestjs/common';
import { LoggerModule, DatabaseModule } from '@app/libs';

import { SupplierServiceGrpcController } from './supplier-service.grpc-controller';

@Module({
  imports: [LoggerModule.forRoot(), DatabaseModule],
  controllers: [SupplierServiceGrpcController],
})
export class SupplierServiceModule {}
