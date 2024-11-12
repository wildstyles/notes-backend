import { Controller } from '@nestjs/common';

import {
  CreateUserRequest,
  CreateUserResponse,
  GrpcController,
  USER_SERVICE_NAME,
} from '@repo/common';

import { CreateUserCommand, CreateUserHandler } from '../../application';

@Controller()
export class CreateUserGrpcController extends GrpcController(
  USER_SERVICE_NAME,
  'createUser',
) {
  constructor(private readonly handler: CreateUserHandler) {
    super();
  }

  async handle(request: CreateUserRequest): Promise<CreateUserResponse> {
    const command = new CreateUserCommand(request);

    const result = await this.handler.execute(command);

    return result;
  }
}
