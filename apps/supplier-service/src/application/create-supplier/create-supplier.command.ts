import {
  SupplierCategory,
  CreateSupplierRequest,
  CreateSupplierResponse,
  RollbackCreateSupplierRequest,
  RollbackCreateSupplierResponse,
} from '@app/libs';

export class CreateSupplierCommand {
  readonly name: string;

  readonly address?: {
    floor: number;
    street: string;
  };

  readonly startWorkingTime: string;

  readonly endWorkingTime: string;

  readonly categories: SupplierCategory[];

  constructor(request: CreateSupplierRequest) {
    this.name = request.name;
    this.address = request.address;
    this.startWorkingTime = request.startWorkingTime;
    this.endWorkingTime = request.endWorkingTime;
    this.categories = request.categories;
  }
}

export type CreateSupplierCommandResponse = CreateSupplierResponse;

export class RollbackCreateSupplierCommand {
  readonly id: string;

  constructor(request: RollbackCreateSupplierRequest) {
    this.id = request.id;
  }
}

export type RollbackCreateSupplierCommandResponse =
  RollbackCreateSupplierResponse;
