import { Type } from '@nestjs/common';

import { DomainEvent } from '@repo/common/ddd/base.domain-event';
import { DomainEventHandler as BaseDomainEventHandler } from '@repo/common/ddd/base.domain-event-handler';

import { IDbCommandContext } from '../../infrastructure/database/db-command-context.service';

export function DomainEventHandler<E extends Type<DomainEvent>>(event: E) {
  return BaseDomainEventHandler<E, IDbCommandContext>(event);
}
