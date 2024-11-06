import { ApiProperty } from '@nestjs/swagger';

export class CreateSupplyResponseDto {
  @ApiProperty()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
