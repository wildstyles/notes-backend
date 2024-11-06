import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateSupplyCommand } from './create-supply.command';

import { GrpcClientService, CreateSupplyResponse } from '@app/libs';
import { lastValueFrom } from 'rxjs';

@CommandHandler(CreateSupplyCommand)
export class CreateSupplyHandler
  implements ICommandHandler<CreateSupplyCommand, CreateSupplyResponse>
{
  constructor(
    private readonly grpcClient: GrpcClientService<'SupplierService'>,
  ) {}

  async execute(command: CreateSupplyCommand): Promise<CreateSupplyResponse> {
    const result$ = this.grpcClient.methods.createSupply({
      name: 'Supply 1',
      price: 0,
      description: 'Description',
      supplierId: command.supplierId,
    });

    return lastValueFrom(result$);
  }
}
