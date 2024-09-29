import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

import { CreateSupplyResponse } from '@app/libs';

import { CreateSupplyCommand } from '.';
import { CreateRequestContext } from '@mikro-orm/core';

@CommandHandler(CreateSupplyCommand)
export class CreateSupplyHandler
  implements ICommandHandler<CreateSupplyCommand, CreateSupplyResponse>
{
  constructor() {}

  @CreateRequestContext()
  async execute(command: CreateSupplyCommand): Promise<CreateSupplyResponse> {
    console.log(command);

    return {
      supply: { id: '1' } as any,
    };
  }
}
