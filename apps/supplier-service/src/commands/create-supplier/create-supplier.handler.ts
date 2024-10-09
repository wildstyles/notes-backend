import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

import { CreateSupplierResponse } from '@app/libs';
import { IPersistenceService } from '../../database/persistence.service';

import { CreateSupplierCommand } from '.';

import { SupplierModel } from '../../domain/supplier.model';

@CommandHandler(CreateSupplierCommand)
export class CreateSupplierHandler
  implements ICommandHandler<CreateSupplierCommand, CreateSupplierResponse>
{
  constructor(private readonly persistenceService: IPersistenceService) {}

  async execute(
    command: CreateSupplierCommand,
  ): Promise<CreateSupplierResponse> {
    const supplier = SupplierModel.create({
      name: 'Winetime',
      startWorkingTime: '08:00',
      endWorkingTime: '17:00',
    });

    this.persistenceService.suppliers.create(supplier);

    await this.persistenceService.em.flush();

    return {
      id: supplier.getProps().id,
    };
  }
}
