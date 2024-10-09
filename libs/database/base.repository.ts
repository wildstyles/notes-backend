import {
  EntityRepository,
  FilterQuery,
  FindOneOrFailOptions,
  RequiredEntityData,
  FromEntityType,
  Primary,
  EntityData,
} from '@mikro-orm/postgresql';
import { BaseEntity } from './base.entity';
import { BaseModel } from '../ddd/base.model';

// https://medium.com/brain-station-23/repository-pattern-for-data-access-in-nestjs-using-typeorm-bbf0a92d6d7c
// https://dou.ua/forums/topic/47721/

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
  Model extends BaseModel,
  Entity extends BaseEntity,
> {
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

  update(model: Model): void {
    const entityData = this.mapper.toEntityData(model);
    const ref = this.repository.getReference(entityData.id);

    this.repository.assign(
      ref,
      entityData as EntityData<FromEntityType<Entity>>,
    );
  }

  create(model: Model): void {
    const entityData = this.mapper.toEntityData(model);

    this.repository.create(entityData);
  }

  delete(model: Model): void {
    const { id } = model.getProps();

    const em = this.repository.getEntityManager();
    const ref = this.repository.getReference(id as Primary<Entity>);

    em.remove(ref);
  }
}
