import { Cascade, Entity, ManyToOne, Property, Ref } from '@mikro-orm/core';

import { BaseEntity } from '../base.entity';
import { SupplierEntity } from './supplier.entity';

// import { SupplyRepository } from '../repositories/supply.repository';

@Entity({ tableName: 'supplies' })
export class SupplyEntity extends BaseEntity {
  @Property({ length: 255, type: 'varchar' })
  name: string;

  @Property({ length: 255, type: 'varchar' })
  description: string;

  @Property({ type: 'numeric' })
  price: number;

  @ManyToOne({
    cascade: [Cascade.ALL],
    ref: true,
    entity: () => SupplierEntity,
  })
  supplier: Ref<SupplierEntity>;

  // [EntityRepositoryType]?: SupplyRepository;
}
