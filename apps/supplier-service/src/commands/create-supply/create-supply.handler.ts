import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

import { CreateSupplyResponse as Response } from '@app/libs';

import { CreateSupplyCommand } from '.';

import { IDbContext } from '../../database/db-context.service';
import { Result, Ok } from 'oxide.ts';

import { MaxSuppliesReachedError } from '../../domain/supplier.errors';

export type CreateSupplyResponse = Result<Response, MaxSuppliesReachedError>;

@CommandHandler(CreateSupplyCommand)
export class CreateSupplyHandler
  implements ICommandHandler<CreateSupplyCommand, CreateSupplyResponse>
{
  constructor(private readonly dbContext: IDbContext) {}

  async execute(command: CreateSupplyCommand): Promise<CreateSupplyResponse> {
    const supplier = await this.dbContext.suppliers.findOneOrFail(
      command.supplierId,
    );

    const result = supplier.addSupply({
      name: command.name,
      price: command.price,
      description: command.description,
    });

    if (result.isErr()) {
      return result;
    }

    this.dbContext.suppliers.update(supplier);

    await this.dbContext.em.flush();

    return Ok({ supply: { id: result.unwrap() } as any });
  }
}
