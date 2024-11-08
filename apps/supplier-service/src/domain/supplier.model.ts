import { Result, Ok, Err } from 'oxide.ts';

import { SupplyModel, CreateSupplyProps, SupplyId } from './supply.model';

import { Id } from '../../../../libs/ddd/base.model';

import { AggregateRoot } from '../../../../libs/ddd/base.aggregate-root';

import { MaxSuppliesReachedError } from './supplier.errors';
import { SupplierCreatedDomainEvent } from './events/supplier-created.domain-event';

interface SupplierProps {
  name: string;
  startWorkingTime: string;
  endWorkingTime: string;
  supplies: SupplyModel[];
}

export interface CreateSupplierProps extends Omit<SupplierProps, 'supplies'> {}
export interface AddSupplyProps extends Omit<CreateSupplyProps, 'supplierId'> {}

export type SupplierId = Id<'Supplier'>;

export class SupplierModel extends AggregateRoot<SupplierProps, SupplierId> {
  public static readonly MAX_SUPPLIES_COUNT = 2;

  public addSupply(
    props: AddSupplyProps,
  ): Result<SupplyId, MaxSuppliesReachedError> {
    if (this.props.supplies.length >= SupplierModel.MAX_SUPPLIES_COUNT) {
      return Err(new MaxSuppliesReachedError());
    }
    const supply = SupplyModel.create({ ...props, supplierId: this.id });

    this.props.supplies.push(supply);

    return Ok(supply.getProps().id);
  }

  static create(props: CreateSupplierProps): SupplierModel {
    const supplier = new SupplierModel({ props: { ...props, supplies: [] } });

    supplier.addEvent(
      new SupplierCreatedDomainEvent({
        aggregateId: supplier.id,
        supplierName: supplier.props.name,
      }),
    );

    return supplier;
  }
}
