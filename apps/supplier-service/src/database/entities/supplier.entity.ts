import { Entity, OneToMany, Property, Collection } from '@mikro-orm/core';

import { BaseEntity } from '../../../../../libs/database/base.entity';

import { SupplyEntity } from './supply.entity';

@Entity({ tableName: 'suppliers' })
export class SupplierEntity extends BaseEntity {
  @Property({ length: 255, type: 'varchar' })
  name: string;

  @Property({ length: 255, type: 'varchar' })
  startWorkingTime: string;

  @Property({ length: 255, type: 'varchar' })
  endWorkingTime: string;

  @OneToMany({
    entity: () => SupplyEntity,
    orphanRemoval: true,
    mappedBy: (supply) => supply.supplier,
  })
  supplies = new Collection<SupplyEntity>(this);
}
