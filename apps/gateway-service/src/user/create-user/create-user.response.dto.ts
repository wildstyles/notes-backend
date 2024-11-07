import { CreateUserResponse } from '@app/libs';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseDto implements CreateUserResponse {
  @ApiProperty()
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}
