import { PrimaryKey, Property, Opt } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

export abstract class BaseEntity {
  @PrimaryKey({ type: 'uuid' })
  id = uuid();

  @Property()
  createdAt: Date & Opt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date & Opt = new Date();
}
