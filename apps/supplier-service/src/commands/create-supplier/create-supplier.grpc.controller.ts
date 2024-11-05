import { Controller } from '@nestjs/common';

import {
  CreateSupplierRequest,
  RollbackCreateSupplierRequest,
  RollbackCreateSupplierResponse,
  CreateSupplierResponse,
} from '@app/libs/grpc-client';

import {
  CreateSupplierCommand,
  CreateSupplierHandler,
  RollbackCreateSupplierCommand,
} from '.';
import { GrpcRollbackController } from '../common/grpc.controller';
import { EntityManager } from '@mikro-orm/postgresql';

@Controller()
export class CreateSupplierGrpcController extends GrpcRollbackController(
  'createSupplier',
  'rollbackCreateSupplier',
) {
  constructor(private readonly handler: CreateSupplierHandler) {
    super();
  }

  async handle(
    request: CreateSupplierRequest,
  ): Promise<CreateSupplierResponse> {
    const command = new CreateSupplierCommand(request);

    return this.handler.execute(command);
  }

  async rollback(
    request: RollbackCreateSupplierRequest,
  ): Promise<RollbackCreateSupplierResponse> {
    const command = new RollbackCreateSupplierCommand(request);

    return this.handler.rollback(command);
  }
}
