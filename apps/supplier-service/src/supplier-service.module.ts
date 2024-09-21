import { Module } from '@nestjs/common';
import { LoggerModule } from '@app/libs';

import { SupplierServiceGrpcController } from './supplier-service.grpc-controller';

@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [SupplierServiceGrpcController],
})
export class SupplierServiceModule {}
