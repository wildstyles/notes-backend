import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { IDbContextBase } from '@repo/common/database/base.repository';

import {
  SupplierEntity,
  SupplyEntity,
} from '@repo/common/database/entities/index';

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
