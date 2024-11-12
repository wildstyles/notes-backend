import {
  DomainEvent,
  IDomainEventProps,
} from '@repo/common/ddd/base.domain-event';

export class SupplierCreatedDomainEvent extends DomainEvent {
  public readonly supplierName: string;

  constructor(props: IDomainEventProps<SupplierCreatedDomainEvent>) {
    super(props);
    this.supplierName = props.supplierName;
  }
}
