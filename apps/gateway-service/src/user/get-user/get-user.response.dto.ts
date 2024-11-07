import { GetUserResponse } from '@app/libs';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserResponseDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly age: number;

  constructor(dto: GetUserResponse) {
    this.id = dto.user!.id;
    this.age = dto.user!.age;
    this.email = dto.user!.email;
    this.name = dto.user!.name;
  }
}
