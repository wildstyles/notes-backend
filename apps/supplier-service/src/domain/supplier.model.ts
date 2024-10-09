import { SupplyModel, CreateSupplyProps } from './supply.model';

import { BaseModel, Id } from '../../../../libs/ddd/base.model';

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
  public addSupply(props: AddSupplyProps): void {
    const supply = SupplyModel.create({ ...props, supplierId: this.id });

    this.props.supplies.push(supply);
  }

  static create(props: CreateSupplierProps): SupplierModel {
    return new SupplierModel({ props: { ...props, supplies: [] } });
  }
}
