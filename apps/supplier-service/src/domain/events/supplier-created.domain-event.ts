import { DomainEvent, IDomainEventProps } from '@repo/common/ddd';

export class SupplierCreatedDomainEvent extends DomainEvent {
  public readonly supplierName: string;

  constructor(props: IDomainEventProps<SupplierCreatedDomainEvent>) {
    super(props);
    this.supplierName = props.supplierName;
  }
}
