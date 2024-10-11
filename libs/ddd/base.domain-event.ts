export type IDomainEventProps<T = unknown> = T & {
  aggregateId: string;
};

export abstract class DomainEvent {
  public readonly aggregateId: IDomainEventProps['aggregateId'];

  constructor(props: IDomainEventProps) {
    this.aggregateId = props.aggregateId;
  }
}
