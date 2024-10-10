import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import {
  CreateSupplierRequest,
  CreateSupplierResponse,
  SUPPLIER_SERVICE_NAME,
} from '@app/libs/grpc-client';

import { CreateSupplierCommand, CreateSupplierHandler } from '.';
import { CreateRequestContext } from '@mikro-orm/core';
import { GrpcController } from '../common/grpc.controller';

@Controller()
export class CreateSupplierGrpcController extends GrpcController<'createSupplier'> {
  constructor(private readonly handler: CreateSupplierHandler) {
    super();
  }

  @GrpcMethod(SUPPLIER_SERVICE_NAME, 'createSupplier')
  @CreateRequestContext()
  async handle(
    request: CreateSupplierRequest,
  ): Promise<CreateSupplierResponse> {
    const command = new CreateSupplierCommand(request);

    return this.handler.execute(command);
  }
}
