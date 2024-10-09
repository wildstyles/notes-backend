import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

import { CreateSupplierResponse } from '@app/libs';
import { IDbContext } from '../../database/db-context.service';

import { CreateSupplierCommand } from '.';

import { SupplierModel } from '../../domain/supplier.model';

@CommandHandler(CreateSupplierCommand)
export class CreateSupplierHandler
  implements ICommandHandler<CreateSupplierCommand, CreateSupplierResponse>
{
  constructor(private readonly dbContext: IDbContext) {}

  async execute(
    command: CreateSupplierCommand,
  ): Promise<CreateSupplierResponse> {
    const supplier = SupplierModel.create({
      name: 'Winetime',
      startWorkingTime: '08:00',
      endWorkingTime: '17:00',
    });

    this.dbContext.suppliers.create(supplier);

    await this.dbContext.em.flush();

    return {
      id: supplier.getProps().id,
    };
  }
}
