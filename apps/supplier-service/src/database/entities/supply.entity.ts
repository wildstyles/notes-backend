import { Entity, Property, ManyToOne, Cascade } from '@mikro-orm/core';

import { BaseEntity } from '@app/libs';

import { SupplierEntity } from './supplier.entity';

@Entity({ tableName: 'supplies' })
export class SupplyEntity extends BaseEntity {
  // @Property({ length: 255, type: 'varchar' })
  // name: string;
  // @Property({ length: 255, type: 'varchar' })
  // description: string;
  // @Property('numeric')
  // price: number;
  // @Property({ type: 'uuid' })
  // supplierId: string;
  // @ManyToOne(() => SupplierEntity, {
  //   cascade: [Cascade.REMOVE],
  // })
  // supplier: SupplierEntity;
}
