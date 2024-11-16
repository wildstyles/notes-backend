import { CommandHandler as BaseCommandHandler } from '@repo/common/cqrs';

import { IDbCommandContext } from '../../infrastructure/database/db-command-context.service';

export abstract class CommandHandler<
  Command extends object,
  Response,
> extends BaseCommandHandler<Command, Response, IDbCommandContext> {}
