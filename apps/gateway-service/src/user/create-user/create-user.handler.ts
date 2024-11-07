import { lastValueFrom } from 'rxjs';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateUserResponse, GrpcClientService } from '@app/libs';

import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, CreateUserResponse>
{
  constructor(private readonly grpcClient: GrpcClientService<'UserService'>) {}

  async execute(command: CreateUserCommand): Promise<CreateUserResponse> {
    const result$ = this.grpcClient.methods.createUser(command);

    return lastValueFrom(result$);
  }
}
