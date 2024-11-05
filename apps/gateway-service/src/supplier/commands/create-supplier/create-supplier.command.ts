import { SupplierCategory, CreateSupplierRequest } from '@app/libs';

import { CreateSupplierRequestDto } from './dto';

export class CreateSupplierCommand implements CreateSupplierRequest {
  readonly name: string;

  readonly address: {
    floor: number;
    street: string;
  };

  readonly startWorkingTime: string;

  readonly endWorkingTime: string;

  readonly categories: SupplierCategory[];

  constructor(dto: CreateSupplierRequestDto) {
    this.name = dto.name;
    this.address = dto.address;
    this.startWorkingTime = dto.startWorkingTime;
    this.endWorkingTime = dto.endWorkingTime;
    this.categories = dto.categories.map(
      (category) => SupplierCategory[category],
    );
  }
}
