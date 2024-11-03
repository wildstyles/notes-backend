import { Module } from '@nestjs/common';
import { LoggerModule } from '@app/libs/logger/logger.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  providers: [{ provide: APP_PIPE, useClass: ZodValidationPipe }],
  imports: [LoggerModule.forRoot(), UserModule, SupplierModule],
})
export class AppModule {}
