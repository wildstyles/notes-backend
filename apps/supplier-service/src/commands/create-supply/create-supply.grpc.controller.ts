import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';

import {
  SupplierServiceController,
  CreateSupplyRequest,
  CreateSupplyResponse,
  SUPPLIER_SERVICE_NAME,
} from '@app/libs/grpc-client';

import { CreateSupplyCommand } from '.';

@Controller()
export class CreateSupplyGrpcController
  implements Pick<SupplierServiceController, 'createSupply'>
{
  constructor(private readonly commandBus: CommandBus) {}

  @GrpcMethod(SUPPLIER_SERVICE_NAME, 'createSupply')
  async createSupply(
    request: CreateSupplyRequest,
  ): Promise<CreateSupplyResponse> {
    const command = new CreateSupplyCommand(request);

    return this.commandBus.execute<CreateSupplyCommand, CreateSupplyResponse>(
      command,
    );
  }
}
