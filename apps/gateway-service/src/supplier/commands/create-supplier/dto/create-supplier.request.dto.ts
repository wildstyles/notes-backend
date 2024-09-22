import { SupplierCategory } from '@app/libs';
import { ApiProperty } from '@nestjs/swagger';

class SupplierAddressDto {
  floor: number;
  street: string;
}

export class CreateSupplierRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: SupplierAddressDto;

  @ApiProperty()
  startWorkingTime: string;

  @ApiProperty()
  endWorkingTime: string;

  @ApiProperty()
  categories: SupplierCategory[];
}
