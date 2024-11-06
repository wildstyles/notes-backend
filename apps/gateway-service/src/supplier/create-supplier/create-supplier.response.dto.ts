import { ApiProperty } from '@nestjs/swagger';

export class CreateSupplierResponseDto {
  @ApiProperty()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
