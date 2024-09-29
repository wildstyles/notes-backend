import { EntityRepository } from '@mikro-orm/postgresql';

// https://medium.com/brain-station-23/repository-pattern-for-data-access-in-nestjs-using-typeorm-bbf0a92d6d7c
export abstract class IGenericRepository<
  T extends object,
> extends EntityRepository<T> {}
