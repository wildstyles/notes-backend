import { CreateUserRequest } from '@app/libs';

import { CreateUserRequestDto } from './create-user.request.dto';

export class CreateUserCommand implements CreateUserRequest {
  readonly name: string;

  readonly password: string;

  readonly age: number;

  readonly email: string;

  constructor(dto: CreateUserRequestDto) {
    this.name = dto.name;
    this.email = dto.email;
    this.age = dto.age;
    this.password = dto.password;
  }
}
