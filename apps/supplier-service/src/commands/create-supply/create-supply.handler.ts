import { Injectable } from '@nestjs/common';
import { Ok } from 'oxide.ts';

import { CommandHandler } from '../common/command.handler';

import {
  CreateSupplyCommand as Command,
  CreateSupplyCommandResponse as Response,
} from '.';

@Injectable()
export class CreateSupplyHandler extends CommandHandler<Command, Response> {
  async implementation(command: Command): Promise<Response> {
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

    await this.dbContext.suppliers.update(supplier);

    return Ok({ id: result.unwrap() });
  }
}
