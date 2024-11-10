import { Inject, Type } from '@nestjs/common';
import { DomainEvent } from '@app/libs/ddd/base.domain-event';
import { OnEvent } from '@nestjs/event-emitter';

import { DB_COMMAND_CONTEXT_TOKEN, IDbContextBase } from '@app/libs';

export function DomainEventHandler<
  Event extends Type<DomainEvent>,
  DbContext extends IDbContextBase = IDbContextBase,
>(event: Event) {
  abstract class DomainEventHandler {
    @Inject(DB_COMMAND_CONTEXT_TOKEN)
    public readonly dbContext: DbContext;

    @OnEvent(event.name, { async: true, promisify: true })
    async handle(event: InstanceType<Event>) {
      await this.implementation(event);
    }

    abstract implementation(event: InstanceType<Event>): Promise<void>;
  }

  return DomainEventHandler;
}
