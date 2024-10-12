import {
  Controller,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateRequestContext } from '@mikro-orm/core';
import { GrpcMethod } from '@nestjs/microservices';
import { match } from 'oxide.ts';

import {
  CreateSupplyRequest,
  CreateSupplyResponse,
  SUPPLIER_SERVICE_NAME,
} from '@app/libs/grpc-client';

import { CreateSupplyHandler } from './create-supply.handler';

import { CreateSupplyCommand } from '.';

import { GrpcController } from '../common/grpc.controller';
import { MaxSuppliesReachedError } from '../../domain/supplier.errors';

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
        if (e instanceof MaxSuppliesReachedError) {
          throw new ConflictException(e.message);
        }

        throw new InternalServerErrorException('An unknown error occurred');
      },
    });
  }
}
