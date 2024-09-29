import { CreateSupplyRequest } from '@app/libs';

export class CreateSupplyCommand {
  readonly name: string;

  readonly description: string;

  readonly price: number;

  readonly supplierId: string;

  constructor(request: CreateSupplyRequest) {
    this.name = request.name;
    this.description = request.description;
    this.price = request.price;
    this.supplierId = request.supplierId;
  }
}
