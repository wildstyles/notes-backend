import { Injectable } from '@nestjs/common';

import { SupplierModel } from '../../domain/supplier.model';
import { CommandHandler } from '../common/command.handler';
import {
  CreateSupplierCommand as Command,
  CreateSupplierCommandResponse as Response,
  RollbackCreateSupplierCommand as RollbackCommand,
  RollbackCreateSupplierCommandResponse as RollbackResponse,
} from './create-supplier.command';

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
