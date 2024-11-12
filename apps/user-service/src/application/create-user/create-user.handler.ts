import { Injectable } from '@nestjs/common';

import { UserModel } from '../../domain/user.model';
import { CommandHandler } from '../common/command.handler';
import {
  CreateUserCommand as Command,
  CreateUserCommandResponse as Response,
} from './create-user.command';

@Injectable()
export class CreateUserHandler extends CommandHandler<Command, Response> {
  async implementation(command: Command): Promise<Response> {
    const user = new UserModel({ props: command });

    await this.dbContext.users.create(user);

    return { id: user.getProps().id };
  }
}
