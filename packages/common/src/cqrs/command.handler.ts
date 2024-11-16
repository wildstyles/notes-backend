import { Inject } from '@nestjs/common';

import { DB_COMMAND_CONTEXT_TOKEN, IDbContextBase } from '../database';

export interface ICommandHandler<TCommand extends object, TResult = any> {
  execute(command: TCommand): Promise<TResult>;
}

export abstract class CommandHandler<
  Command extends object,
  Response,
  DbContext extends IDbContextBase = IDbContextBase,
> implements ICommandHandler<Command, Response>
{
  protected flashable = true;

  @Inject(DB_COMMAND_CONTEXT_TOKEN)
  protected readonly dbContext: DbContext;

  async execute(command: Command): Promise<Response> {
    const result = await this.implementation(command);

    if (this.flashable) {
      await this.dbContext.em.flush();
    }

    return result;
  }

  abstract implementation(command: Command): Promise<Response>;
}
