import { SupplierId } from './supplier.model';

import { BaseModel, Id } from '../../../../libs/ddd/base.model';

interface SupplyProps {
  name: string;
  description: string;
  price: number;
  supplierId: SupplierId;
}

export type SupplyId = Id<'Supply'>;

export type CreateSupplyProps = SupplyProps;

export class SupplyModel extends BaseModel<SupplyProps, SupplyId> {
  static create(props: CreateSupplyProps): SupplyModel {
    return new SupplyModel({ props });
  }
}
