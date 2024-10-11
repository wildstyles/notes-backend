import {
  EntityRepository,
  FilterQuery,
  FindOneOrFailOptions,
  RequiredEntityData,
  FromEntityType,
  Primary,
  EntityData,
  EntityManager,
} from '@mikro-orm/postgresql';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BaseEntity } from './base.entity';
import { AggregateRoot } from '../ddd/base.aggregate-root';
import { Inject } from '@nestjs/common';
import { BaseModel } from '../ddd/base.model';

// https://medium.com/brain-station-23/repository-pattern-for-data-access-in-nestjs-using-typeorm-bbf0a92d6d7c
// https://dou.ua/forums/topic/47721/

export const DB_CONTEXT_TOKEN = 'DB_CONTEXT';

export interface IDbContextBase {
  em: EntityManager;
}

export interface IMapper<
  DomainModel extends BaseModel,
  DatabaseEntity extends BaseEntity,
> {
  toDomain(entity: DatabaseEntity): DomainModel;
  toEntityData: (
    model: DomainModel,
  ) => RequiredEntityData<DatabaseEntity> & { id: Primary<DatabaseEntity> };
}

export abstract class Repository<
  Model extends AggregateRoot,
  Entity extends BaseEntity,
> {
  @Inject(EventEmitter2)
  private readonly eventEmitter: EventEmitter2;

  constructor(
    protected readonly repository: EntityRepository<Entity>,
    protected readonly mapper: IMapper<Model, Entity>,
  ) {}

  async findOneOrFail<Hint extends string = never>(
    where: FilterQuery<Entity>,
    options?: FindOneOrFailOptions<Entity, Hint>,
  ): Promise<Model> {
    const entity = await this.repository.findOneOrFail(where, options);

    return this.mapper.toDomain(entity);
  }

  async update(model: Model): Promise<void> {
    const entityData = this.mapper.toEntityData(model);
    const ref = this.repository.getReference(entityData.id);

    this.repository.assign(
      ref,
      entityData as EntityData<FromEntityType<Entity>>,
    );

    await this.publishDomainEvents(model);
  }

  async create(model: Model): Promise<void> {
    const entityData = this.mapper.toEntityData(model);

    this.repository.create(entityData);

    await this.publishDomainEvents(model);
  }

  async delete(model: Model): Promise<void> {
    const { id } = model.getProps();

    const em = this.repository.getEntityManager();
    const ref = this.repository.getReference(id as Primary<Entity>);

    em.remove(ref);

    await this.publishDomainEvents(model);
  }

  protected async publishDomainEvents(model: Model): Promise<void> {
    await model.publishEvents(this.eventEmitter);
  }
}
