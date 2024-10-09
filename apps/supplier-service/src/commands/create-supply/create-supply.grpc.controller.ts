import { Controller, BadRequestException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';

import {
  SupplierServiceController,
  CreateSupplyRequest,
  CreateSupplyResponse as Response,
  SUPPLIER_SERVICE_NAME,
} from '@app/libs/grpc-client';
import { CreateRequestContext } from '@mikro-orm/core';
import { CreateSupplyResponse } from './create-supply.handler';

import { CreateSupplyCommand } from '.';
import { EntityManager } from '@mikro-orm/postgresql';
import { match } from 'oxide.ts';

@Controller()
export class CreateSupplyGrpcController
  implements Pick<SupplierServiceController, 'createSupply'>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly em: EntityManager,
  ) {}

  @GrpcMethod(SUPPLIER_SERVICE_NAME, 'createSupply')
  @CreateRequestContext()
  async createSupply(request: CreateSupplyRequest): Promise<Response> {
    const command = new CreateSupplyCommand(request);

    const result = await this.commandBus.execute<
      CreateSupplyCommand,
      CreateSupplyResponse
    >(command);

    return match(result, {
      Ok: (r) => r,
      Err: (e) => {
        throw new BadRequestException(e.message);
      },
    });
  }
}
