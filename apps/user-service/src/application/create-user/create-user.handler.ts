import { Injectable } from '@nestjs/common';

import { CommandHandler } from '../common/command.handler';

import {
  CreateUserCommand as Command,
  CreateUserCommandResponse as Response,
} from './create-user.command';

import { UserModel } from '../../domain/user.model';

@Injectable()
export class CreateUserHandler extends CommandHandler<Command, Response> {
  async implementation(command: Command): Promise<Response> {
    const user = new UserModel({ props: command });

    await this.dbContext.users.create(user);

    return { id: user.getProps().id };
  }
}
