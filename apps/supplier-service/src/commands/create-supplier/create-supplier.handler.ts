import { Injectable } from '@nestjs/common';

import { CommandHandler } from '../common/command.handler';

import {
  CreateSupplierCommand as Command,
  CreateSupplierCommandResponse as Response,
} from '.';

import { SupplierModel } from '../../domain/supplier.model';

@Injectable()
export class CreateSupplierHandler extends CommandHandler<Command, Response> {
  async implementation(command: Command): Promise<Response> {
    const supplier = SupplierModel.create({
      name: 'Winetime',
      startWorkingTime: '08:00',
      endWorkingTime: '17:00',
    });

    await this.dbContext.suppliers.create(supplier);

    return {
      id: supplier.getProps().id,
    };
  }
}
