import { ApiProperty } from '@nestjs/swagger';

export class CreateSupplyRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;
}
