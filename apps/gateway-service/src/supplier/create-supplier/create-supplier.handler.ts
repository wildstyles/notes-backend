import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  CreateSupplierResponse,
  CreateSupplyResponse,
} from '@repo/common/grpc-client';

import { CreateSupplierCommand } from './create-supplier.command';
import { CreateSupplierSaga } from './create-supplier.saga';

@CommandHandler(CreateSupplierCommand)
export class CreateSupplierHandler
  implements ICommandHandler<CreateSupplierCommand, CreateSupplierResponse>
{
  constructor(private readonly saga: CreateSupplierSaga) {}

  async execute(command: CreateSupplierCommand): Promise<CreateSupplyResponse> {
    const result = await this.saga.execute(command);

    return {
      id: result.createSupplier.id,
    };
  }
}
