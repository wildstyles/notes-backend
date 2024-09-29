import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { GrpcClientService } from '@app/libs';

import { CreateSupplierResponse } from '@app/libs';
import { IDataService } from '../../database/repositories/data.service';

import { CreateSupplierCommand } from '.';
import { DataService } from '../../database/repositories/data.service';
import { SupplierRepository } from '../../database/repositories';
import { EntityManager } from '@mikro-orm/postgresql';
import { CreateRequestContext } from '@mikro-orm/postgresql';
import { SupplierEntity } from '../../database/entities';

@CommandHandler(CreateSupplierCommand)
export class CreateSupplierHandler
  implements ICommandHandler<CreateSupplierCommand, CreateSupplierResponse>
{
  constructor(
    private readonly em: EntityManager, // private readonly supplierRepository: SupplierRepository, // private readonly dataService: IDataService,
  ) {}

  @CreateRequestContext()
  async execute(
    command: CreateSupplierCommand,
  ): Promise<CreateSupplierResponse> {
    console.log(command);

    // const supplier = this.supplierRepository.create({ namee: ''});

    const god = await this.em.find(SupplierEntity, { name: 'god' });

    return {
      id: '123',
    };
  }
}
