import {
  CreateUserRequest,
  CreateUserResponse,
} from '@repo/common/grpc-client';

export class CreateUserCommand {
  readonly name: string;

  readonly email: string;

  readonly password: string;

  readonly age: number;

  constructor(request: CreateUserRequest) {
    this.name = request.name;
    this.age = request.age;
    this.email = request.email;
    this.password = request.password;
  }
}

export type CreateUserCommandResponse = CreateUserResponse;
