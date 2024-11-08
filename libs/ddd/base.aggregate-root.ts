import { EventEmitter2 } from '@nestjs/event-emitter';
import { BaseModel, Id } from './base.model';
import { DomainEvent } from './base.domain-event';

export abstract class AggregateRoot<
  ModelProps extends {} = {},
  ModelId extends Id<string> = string,
> extends BaseModel<ModelProps, ModelId> {
  private _domainEvents: DomainEvent[] = [];

  protected addEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  private clearEvents(): void {
    this._domainEvents = [];
  }

  public async publishEvents(eventEmitter: EventEmitter2): Promise<void> {
    await Promise.all(
      this._domainEvents.map(async (event) => {
        return eventEmitter.emitAsync(event.constructor.name, event);
      }),
    );

    this.clearEvents();
  }
}
