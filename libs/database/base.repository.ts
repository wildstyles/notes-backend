import { EntityRepository, RequiredEntityData } from '@mikro-orm/postgresql';

// https://medium.com/brain-station-23/repository-pattern-for-data-access-in-nestjs-using-typeorm-bbf0a92d6d7c
// https://dou.ua/forums/topic/47721/

export interface IMapper<DomainModel, DatabaseEntity> {
  toDomain(entity: DatabaseEntity): DomainModel;
  toEntityData: (model: DomainModel) => RequiredEntityData<DatabaseEntity>;
}

export abstract class Repository<Model, Entity extends object> {
  constructor(
    protected readonly repository: EntityRepository<Entity>,
    protected readonly mapper: IMapper<Model, Entity>,
  ) {}

  create(model: Model): Entity {
    const entityData = this.mapper.toEntityData(model);

    return this.repository.create(entityData);
  }
}
