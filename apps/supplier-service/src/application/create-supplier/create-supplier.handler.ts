import { Injectable } from '@nestjs/common';

import { CommandHandler } from '../common/command.handler';

import {
  RollbackCreateSupplierCommand as RollbackCommand,
  RollbackCreateSupplierCommandResponse as RollbackResponse,
  CreateSupplierCommand as Command,
  CreateSupplierCommandResponse as Response,
} from './create-supplier.command';

import { SupplierModel } from '../../domain/supplier.model';

@Injectable()
export class CreateSupplierHandler extends CommandHandler<Command, Response> {
  async implementation(command: Command): Promise<Response> {
    const supplier = SupplierModel.create({
      name: command.name,
      startWorkingTime: command.startWorkingTime,
      endWorkingTime: command.endWorkingTime,
    });

    await this.dbContext.suppliers.create(supplier);

    return {
      id: supplier.getProps().id,
    };
  }

  async rollback(command: RollbackCommand): Promise<RollbackResponse> {
    const ref = this.dbContext.suppliers.getReference(command.id);

    await this.dbContext.em.removeAndFlush(ref);

    return {
      id: command.id,
    };
  }
}
