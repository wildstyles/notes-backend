import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';

import { Repository } from '@repo/common/database/base.repository';
import { SupplierEntity } from '@repo/common/database/entities/supplier.entity';

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
