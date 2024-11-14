import { Result } from 'oxide.ts';

import {
  CreateSupplyRequest,
  CreateSupplyResponse,
} from '@repo/common/grpc-client';

import { MaxSuppliesReachedError } from '../../domain/supplier.errors';

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

export type CreateSupplyCommandResponse = Result<
  CreateSupplyResponse,
  MaxSuppliesReachedError
>;
