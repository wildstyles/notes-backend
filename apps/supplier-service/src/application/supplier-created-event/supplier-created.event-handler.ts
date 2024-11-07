import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SupplierCreatedDomainEvent } from '../../domain/events/supplier-created.domain-event';
import { DomainEventHandler } from '../common/domain-event.handler';
import { SupplyModel } from '../../domain/supply.model';

@Injectable()
export class SupplierCreatedEventHandler extends DomainEventHandler<SupplierCreatedDomainEvent> {
  @OnEvent(SupplierCreatedDomainEvent.name, { async: true })
  async implementation(event: SupplierCreatedDomainEvent) {
    console.log('Supply created event handler');

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
