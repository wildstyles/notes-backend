import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';

import {
  SupplierServiceController,
  CreateSupplierRequest,
  CreateSupplierResponse,
  SUPPLIER_SERVICE_NAME,
} from '@app/libs/grpc-client';

import { CreateSupplierCommand } from '.';
import { CreateRequestContext } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';

@Controller()
export class CreateSupplierGrpcController
  implements Pick<SupplierServiceController, 'createSupplier'>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly em: EntityManager,
  ) {}

  @GrpcMethod(SUPPLIER_SERVICE_NAME, 'createSupplier')
  @CreateRequestContext()
  async createSupplier(
    request: CreateSupplierRequest,
  ): Promise<CreateSupplierResponse> {
    const command = new CreateSupplierCommand(request);

    return this.commandBus.execute<
      CreateSupplierCommand,
      CreateSupplierResponse
    >(command);
  }
}
