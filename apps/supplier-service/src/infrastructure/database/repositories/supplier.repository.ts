import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';

import { Repository, SupplierEntity } from '@repo/common/database';

import { SupplierModel } from '../../../domain/supplier.model';
import { SupplierMapper } from '../mappers/supplier.mapper';

@Injectable()
export class SupplierRepository extends Repository<
  SupplierModel,
  SupplierEntity
> {
  constructor(
    protected readonly mapper: SupplierMapper,
    protected readonly em: EntityManager,
  ) {
    super(em.getRepository(SupplierEntity), mapper);
  }

  async findOneOrFail(id: string): Promise<SupplierModel> {
    return super.findOneOrFail(id, { populate: ['supplies'] });
  }
}
