import { Injectable } from '@nestjs/common';
import { SupplierCreatedDomainEvent } from '../../domain/events/supplier-created.domain-event';
import { DomainEventHandler } from '../common/domain-event.handler';
import { SupplyModel } from '../../domain/supply.model';

@Injectable()
export class SupplierCreatedEventHandler extends DomainEventHandler(
  SupplierCreatedDomainEvent,
) {
  async implementation(event: SupplierCreatedDomainEvent) {
    const supply = SupplyModel.create({
      supplierId: event.aggregateId,
      name: 'Supply From Domain Event',
      price: 100,
      description: '',
    });

    this.dbContext.supplies.create({
      ...supply.getProps(),
      supplier: event.aggregateId,
    });
  }
}
