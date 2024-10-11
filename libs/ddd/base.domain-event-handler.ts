import { Inject } from '@nestjs/common';
import { DomainEvent } from '@app/libs/ddd/base.domain-event';

import { DB_CONTEXT_TOKEN, IDbContextBase } from '@app/libs';

export abstract class DomainEventHandler<
  Event extends DomainEvent,
  DbContext extends IDbContextBase = IDbContextBase,
> {
  @Inject(DB_CONTEXT_TOKEN)
  protected readonly dbContext: DbContext;

  // @OnEvent(Event.name)
  async handle(event: Event) {
    await this.implementation(event);
  }

  abstract implementation(event: Event): Promise<void>;
}
