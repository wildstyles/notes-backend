import { Type } from '@nestjs/common';
import { DomainEventHandler as BaseDomainEventHandler } from '@app/libs/ddd/base.domain-event-handler';
import { DomainEvent } from '@app/libs/ddd/base.domain-event';
import { IDbCommandContext } from '../../infrastructure/database/db-command-context.service';

export function DomainEventHandler<E extends Type<DomainEvent>>(event: E) {
  return BaseDomainEventHandler<E, IDbCommandContext>(event);
}
