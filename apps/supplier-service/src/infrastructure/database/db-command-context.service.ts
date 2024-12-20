import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';

import { IDbContextBase, SupplyEntity } from '@repo/common/database';

import { SupplierRepository, SupplyRepository } from './repositories';

export interface IDbCommandContext extends IDbContextBase {
  suppliers: SupplierRepository;
  supplies: SupplyRepository;
}

@Injectable()
export class DbCommandContext implements IDbCommandContext {
  suppliers: SupplierRepository;
  supplies: SupplyRepository;
  em: EntityManager;

  constructor(
    private readonly supplierRepository: SupplierRepository,
    private readonly entityManager: EntityManager,
  ) {
    this.em = this.entityManager;
    this.suppliers = this.supplierRepository;
    this.supplies = this.em.getRepository(SupplyEntity);
  }
}
