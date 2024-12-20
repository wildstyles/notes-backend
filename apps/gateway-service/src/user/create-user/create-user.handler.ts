import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { lastValueFrom } from 'rxjs';

import {
  CreateUserResponse,
  GrpcClientService,
} from '@repo/common/grpc-client';

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
