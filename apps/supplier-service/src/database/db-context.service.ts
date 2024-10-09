import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';

import { SupplierRepository, SupplyRepository } from './repositories';

export abstract class IDbContext {
  suppliers: SupplierRepository;
  supplies: SupplyRepository;
  em: EntityManager;
}

@Injectable()
export class DbContext implements IDbContext {
  suppliers: SupplierRepository;
  supplies: SupplyRepository;
  em: EntityManager;

  constructor(
    private readonly supplierRepository: SupplierRepository,
    private readonly supplyRepository: SupplyRepository,
    private readonly entityManager: EntityManager,
  ) {
    this.em = this.entityManager;
    this.suppliers = this.supplierRepository;
    this.supplies = this.supplyRepository;
  }
}
