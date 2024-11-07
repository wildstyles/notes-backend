import { DomainEventHandler as BaseDomainEventHandler } from '@app/libs/ddd/base.domain-event-handler';
import { DomainEvent } from '@app/libs/ddd/base.domain-event';
import { DbContext } from '../../infrastructure/database/db-context.service';

export abstract class DomainEventHandler<
  Event extends DomainEvent,
> extends BaseDomainEventHandler<Event, DbContext> {}
