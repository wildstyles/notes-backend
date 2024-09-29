import { Entity, OneToMany, Property } from '@mikro-orm/core';

import { BaseEntity } from '../../../../../libs/database/base.entity';
import { SupplierRepository } from '../repositories/supplier.repository';

// import { SupplyEntity } from './supply.entity';

@Entity({ tableName: 'suppliers', repository: () => SupplierRepository })
export class SupplierEntity extends BaseEntity {
  @Property({ columnType: 'varchar' })
  name!: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  // @Property({ length: 255, type: 'varchar' })
  // startWorkingTime: string;
  // @Property('numeric')
  // endWorkingTime: number;
  // @OneToMany(() => SupplyEntity, (supply) => supply.supplier)
  // supplies: SupplyEntity[];
}
