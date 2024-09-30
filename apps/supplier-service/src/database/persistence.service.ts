import { Injectable } from '@nestjs/common';

import { SupplierRepository, SupplyRepository } from './repositories';

export abstract class IPersistenceService {
  suppliers: SupplierRepository;
  supplies: SupplyRepository;
}

@Injectable()
export class PersistenceService implements IPersistenceService {
  suppliers: SupplierRepository;
  supplies: SupplyRepository;

  constructor(
    private readonly supplierRepository: SupplierRepository,
    private readonly supplyRepository: SupplyRepository,
  ) {
    this.suppliers = this.supplierRepository;
    this.supplies = this.supplyRepository;
  }
}
