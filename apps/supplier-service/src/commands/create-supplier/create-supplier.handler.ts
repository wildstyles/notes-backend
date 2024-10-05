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
    const supplier = this.persistenceService.suppliers.create({
      name: 'Winetime',
      startWorkingTime: '08:00',
      endWorkingTime: '17:00',
      supplies: [{ name: 'Wine', price: 100, description: 'Red wine' }],
    });

    await this.persistenceService.em.flush();

    return {
      id: '123',
    };
  }
}
