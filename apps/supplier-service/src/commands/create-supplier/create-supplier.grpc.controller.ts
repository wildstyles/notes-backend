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

@Controller()
export class CreateSupplierGrpcController
  implements Pick<SupplierServiceController, 'createSupplier'>
{
  constructor(private readonly commandBus: CommandBus) {}

  @GrpcMethod(SUPPLIER_SERVICE_NAME, 'createSupplier')
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
