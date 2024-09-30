import {
  Entity,
  OneToMany,
  Property,
  EntityRepositoryType,
} from '@mikro-orm/core';

import { BaseEntity } from '../../../../../libs/database/base.entity';
import { SupplierRepository } from '../repositories/supplier.repository';

@Entity({ tableName: 'suppliers', repository: () => SupplierRepository })
export class SupplierEntity extends BaseEntity {
  @Property({ type: 'string' })
  name!: string;

  @Property({ length: 255, type: 'varchar' })
  startWorkingTime: string;

  @Property({ type: 'numeric' })
  endWorkingTime: number;

  [EntityRepositoryType]?: SupplierRepository;

  // @OneToMany(() => SupplyEntity, (supply) => supply.supplier)
  // supplies: SupplyEntity[];
}
