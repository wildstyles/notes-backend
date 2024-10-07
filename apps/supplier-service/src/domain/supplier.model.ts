import { SupplyModel } from './supply.model';

import { BaseModel, Id } from './base.model';

interface SupplierProps {
  name: string;
  startWorkingTime: string;
  endWorkingTime: string;
  supplies: SupplyModel[];
}

interface CreateSupplierProps {
  name: string;
  startWorkingTime: string;
  endWorkingTime: string;
}

type SupplierId = Id<'Supplier'>;

export class SupplierModel extends BaseModel<SupplierProps, SupplierId> {
  public addSupply(supply: SupplyModel): void {
    this.props.supplies.push(supply);
  }

  static create(props: CreateSupplierProps): SupplierModel {
    return new SupplierModel({ props: { ...props, supplies: [] } });
  }
}
