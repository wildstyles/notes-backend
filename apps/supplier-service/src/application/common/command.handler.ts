import {
  CommandHandler as BaseCommandHandler,
  ICommand,
} from '@app/libs/cqrs/command.handler';
import { IDbContext } from '../../infrastructure/database/db-context.service';

export abstract class CommandHandler<
  Command extends ICommand,
  Response,
> extends BaseCommandHandler<Command, Response, IDbContext> {}
