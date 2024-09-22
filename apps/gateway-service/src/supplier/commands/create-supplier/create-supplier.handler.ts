import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { GrpcClientService } from '@app/libs';
import { lastValueFrom } from 'rxjs';

import { CreateSupplierResponse } from '@app/libs';

import { CreateSupplierCommand } from '.';

@CommandHandler(CreateSupplierCommand)
export class CreateSupplierHandler
  implements ICommandHandler<CreateSupplierCommand, CreateSupplierResponse>
{
  constructor(
    private readonly grpcClient: GrpcClientService<'SupplierService'>,
  ) {}

  async execute(
    command: CreateSupplierCommand,
  ): Promise<CreateSupplierResponse> {
    const result$ = this.grpcClient.methods.createSupplier({
      name: 'Supplier 1',
      categories: [2],
      startWorkingTime: '08:00',
      endWorkingTime: '17:00',
      address: {
        street: '123 Street',
        floor: 1,
      },
    });

    return lastValueFrom(result$);
  }
}
