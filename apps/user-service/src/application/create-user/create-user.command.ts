import { CreateUserRequest, CreateUserResponse } from '@app/libs';

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
