import { Type } from '@nestjs/common';

import {
  DomainEventHandler as BaseDomainEventHandler,
  DomainEvent,
} from '@repo/common/ddd';

import { IDbCommandContext } from '../../infrastructure/database/db-command-context.service';

export function DomainEventHandler<E extends Type<DomainEvent>>(event: E) {
  return BaseDomainEventHandler<E, IDbCommandContext>(event);
}
