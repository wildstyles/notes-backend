import { Inject } from '@nestjs/common';
import { IDbContextBase, DB_CONTEXT_TOKEN } from '../database';

export interface ICommand {}

export interface ICommandHandler<
  TCommand extends ICommand = any,
  TResult = any,
> {
  execute(command: TCommand): Promise<TResult>;
}

export abstract class CommandHandler<
  Command extends ICommand,
  Response,
  DbContext extends IDbContextBase = IDbContextBase,
> implements ICommandHandler<Command, Response>
{
  protected flashable: boolean = true;

  @Inject(DB_CONTEXT_TOKEN)
  protected readonly dbContext: DbContext;

  constructor() {}

  async execute(command: Command): Promise<Response> {
    const result = await this.implementation(command);

    if (this.flashable) {
      await this.dbContext.em.flush();
    }

    return result;
  }

  abstract implementation(command: Command): Promise<Response>;
}
