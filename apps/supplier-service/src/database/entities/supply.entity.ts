import {
  Entity,
  Property,
  ManyToOne,
  Cascade,
  EntityRepositoryType,
} from '@mikro-orm/core';

import { BaseEntity } from '../../../../../libs/database/base.entity';

import { SupplierEntity } from './supplier.entity';

import { SupplyRepository } from '../repositories/supply.repository';

@Entity({ tableName: 'supplies', repository: () => SupplyRepository })
export class SupplyEntity extends BaseEntity {
  @Property({ type: 'string' })
  name: string;

  @Property({ type: 'string' })
  description: string;

  @Property({ type: 'numeric' })
  price: number;

  [EntityRepositoryType]?: SupplyRepository;

  // @Property({ type: 'uuid' })
  // supplierId: string;
  // @ManyToOne(() => SupplierEntity, {
  //   cascade: [Cascade.REMOVE],
  // })
  // supplier: SupplierEntity;
}
