import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { IDbContextBase } from '@app/libs';

import { SupplierEntity, SupplyEntity } from './entities';

export interface IDbQueryContext extends IDbContextBase {
  suppliers: EntityRepository<SupplierEntity>;
  supplies: EntityRepository<SupplyEntity>;
}

@Injectable()
export class DbQueryContext implements IDbQueryContext {
  suppliers: EntityRepository<SupplierEntity>;
  supplies: EntityRepository<SupplyEntity>;
  em: EntityManager;

  constructor(private readonly entityManager: EntityManager) {
    this.em = this.entityManager;
    this.suppliers = this.em.getRepository(SupplierEntity);
    this.supplies = this.em.getRepository(SupplyEntity);
  }
}
