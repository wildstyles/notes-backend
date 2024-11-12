import {
  CommandHandler as BaseCommandHandler,
  ICommand,
} from '@repo/common/cqrs/command.handler';

import { IDbCommandContext } from '../../infrastructure/database/db-command-context.service';

export abstract class CommandHandler<
  Command extends ICommand,
  Response,
> extends BaseCommandHandler<Command, Response, IDbCommandContext> {}
