import { Module } from '@nestjs/common';

import { LoggerModule } from '@repo/common';

import { UserModule } from './user/user.module';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [LoggerModule.forRoot(), UserModule, SupplierModule],
})
export class AppModule {}



