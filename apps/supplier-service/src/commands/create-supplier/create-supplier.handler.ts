import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

import { CreateSupplierResponse } from '@app/libs';
import { IPersistenceService } from '../../database/persistence.service';

import { CreateSupplierCommand } from '.';

@CommandHandler(CreateSupplierCommand)
export class CreateSupplierHandler
  implements ICommandHandler<CreateSupplierCommand, CreateSupplierResponse>
{
  constructor(private readonly persistenceService: IPersistenceService) {}

  async execute(
    command: CreateSupplierCommand,
  ): Promise<CreateSupplierResponse> {
    const god = this.persistenceService.suppliers.create({});

    console.log(god);

    // console.log(this.persistenceService.suppliers.create);

    return {
      id: '123',
    };
  }
}
