import { Result, Ok, Err } from 'oxide.ts';

import { SupplyModel, CreateSupplyProps, SupplyId } from './supply.model';

import { BaseModel, Id } from '../../../../libs/ddd/base.model';
import { MaxSuppliesReachedError } from './supplier.errors';

interface SupplierProps {
  name: string;
  startWorkingTime: string;
  endWorkingTime: string;
  supplies: SupplyModel[];
}

interface CreateSupplierProps extends Omit<SupplierProps, 'supplies'> {}
interface AddSupplyProps extends Omit<CreateSupplyProps, 'supplierId'> {}

export type SupplierId = Id<'Supplier'>;

export class SupplierModel extends BaseModel<SupplierProps, SupplierId> {
  private static readonly MAX_SUPPLIES_COUNT = 2;

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
    return new SupplierModel({ props: { ...props, supplies: [] } });
  }
}
