import { CreateSupplyRequest } from '@repo/common/grpc-client';

import { CreateSupplyRequestDto } from './create-supply.request.dto';

export class CreateSupplyCommand implements CreateSupplyRequest {
  readonly name: string;

  readonly description: string;

  readonly price: number;

  readonly supplierId: string;

  constructor(dto: CreateSupplyRequestDto, supplierId: string) {
    this.name = dto.name;
    this.description = dto.description;
    this.price = dto.price;
    this.supplierId = supplierId;
  }
}
