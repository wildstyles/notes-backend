import { Module } from '@nestjs/common';

import { LoggerModule } from '@repo/common/logger';

import { SupplierModule } from './supplier/supplier.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [LoggerModule.forRoot(), UserModule, SupplierModule],
})
export class AppModule {}
