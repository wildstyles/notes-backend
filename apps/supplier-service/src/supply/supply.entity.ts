import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from '@app/libs';

import SupplierEntity from '../supplier/supplier.entity';

@Entity('supplies')
export default class SupplyEntity extends BaseEntity {
  @Column('varchar', { length: 255 })
  name: string;

  @Column({ length: 255, type: 'varchar' })
  description: string;

  @Column('numeric')
  price: number;

  @Column({ type: 'uuid' })
  supplierId: string;

  @ManyToOne(() => SupplierEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'supplier_id' })
  supplier: SupplierEntity;
}
