import { v4 as uuid } from 'uuid';

// https://spin.atomicobject.com/typescript-flexible-nominal-typing/
export type Id<ModelName> = string & { __brand?: ModelName };

export interface BaseModelProps<Id> {
  id: Id;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateModelProps<T, Id> extends Partial<BaseModelProps<Id>> {
  props: T;
}

export abstract class BaseModel<
  ModelProps extends {} = {},
  ModelId extends Id<string> = string,
> {
  protected readonly id: ModelId;
  protected readonly createdAt: Date;
  protected readonly updatedAt: Date;

  protected readonly props: ModelProps;

  constructor({
    id,
    createdAt,
    updatedAt,
    props,
  }: CreateModelProps<ModelProps, ModelId>) {
    const now = new Date();

    this.id = id || (uuid() as ModelId);
    this.createdAt = createdAt || now;
    this.updatedAt = updatedAt || now;
    this.props = props;
  }

  public getProps(): ModelProps & BaseModelProps<ModelId> {
    const propsCopy = {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      ...this.props,
    };

    return Object.freeze(propsCopy);
  }
}
