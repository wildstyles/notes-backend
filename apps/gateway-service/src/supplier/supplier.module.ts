import { Module } from '@nestjs/common';

import { GrpcClientModule } from '@app/libs/grpc-client';

import { SupplierHttpController } from './supplier.http-controller';

@Module({
  imports: [GrpcClientModule.forRoot('SupplierService')],
  controllers: [SupplierHttpController],
  providers: [],
})
export class SupplierModule {}
