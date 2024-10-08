import { CreateSupplyRequestDto } from './dto/create-supply.request.dto';
import { CreateSupplyRequest } from '@app/libs';

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
