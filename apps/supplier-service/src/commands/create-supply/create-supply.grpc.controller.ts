import { Controller, BadRequestException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import {
  CreateSupplyRequest,
  CreateSupplyResponse,
  SUPPLIER_SERVICE_NAME,
} from '@app/libs/grpc-client';
import { CreateRequestContext } from '@mikro-orm/core';
import { CreateSupplyHandler } from './create-supply.handler';

import { CreateSupplyCommand } from '.';
import { match } from 'oxide.ts';
import { GrpcController } from '../common/grpc.controller';

@Controller()
export class CreateSupplyGrpcController extends GrpcController<'createSupply'> {
  constructor(private readonly handler: CreateSupplyHandler) {
    super();
  }

  @GrpcMethod(SUPPLIER_SERVICE_NAME, 'createSupply')
  @CreateRequestContext()
  async handle(request: CreateSupplyRequest): Promise<CreateSupplyResponse> {
    const command = new CreateSupplyCommand(request);

    const result = await this.handler.execute(command);

    return match(result, {
      Ok: (r) => r,
      Err: (e) => {
        throw new BadRequestException(e.message);
      },
    });
  }
}
