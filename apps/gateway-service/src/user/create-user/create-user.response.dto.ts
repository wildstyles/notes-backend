import { ApiProperty } from '@nestjs/swagger';

import { CreateUserResponse } from '@repo/common';

export class CreateUserResponseDto implements CreateUserResponse {
  @ApiProperty()
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}
