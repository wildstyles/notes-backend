import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateSupplierResponse, CreateSupplyResponse } from '@app/libs';

import { CreateSupplierCommand } from '.';

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
