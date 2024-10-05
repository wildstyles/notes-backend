import {
  Entity,
  OneToMany,
  Property,
  Collection,
  EntityRepositoryType,
} from '@mikro-orm/core';

import { BaseEntity } from '../../../../../libs/database/base.entity';
import { SupplierRepository } from '../repositories/supplier.repository';

import { SupplyEntity } from './supply.entity';

@Entity({ tableName: 'suppliers', repository: () => SupplierRepository })
export class SupplierEntity extends BaseEntity {
  @Property({ length: 255, type: 'varchar' })
  name: string;

  @Property({ length: 255, type: 'varchar' })
  startWorkingTime: string;

  @Property({ length: 255, type: 'varchar' })
  endWorkingTime: string;

  @OneToMany({
    entity: () => SupplyEntity,
    mappedBy: (supply) => supply.supplier,
  })
  supplies = new Collection<SupplyEntity>(this);

  [EntityRepositoryType]?: SupplierRepository;
}
