import { Controller } from '@nestjs/common';

import {
  CreateSupplierRequest,
  RollbackCreateSupplierRequest,
  RollbackCreateSupplierResponse,
  CreateSupplierResponse,
  GrpcRollbackController,
  SUPPLIER_SERVICE_NAME,
} from '@repo/common';

import {
  CreateSupplierCommand,
  CreateSupplierHandler,
  RollbackCreateSupplierCommand,
} from '../../application';

@Controller()
export class CreateSupplierGrpcController extends GrpcRollbackController(
  SUPPLIER_SERVICE_NAME,
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
