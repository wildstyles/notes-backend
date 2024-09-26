import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from '@app/libs';

import SupplyEntity from '../supply/supply.entity';

@Entity('suppliers')
export default class SupplierEntity extends BaseEntity {
  @Column('varchar', { length: 255 })
  name: string;

  @Column({ length: 255, type: 'varchar' })
  startWorkingTime: string;

  @Column('numeric')
  endWorkingTime: number;

  @OneToMany(() => SupplyEntity, (supply) => supply.supplier)
  supplies: SupplyEntity[];
}
