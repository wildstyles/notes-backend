import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { IDbContextBase } from '@app/libs';

import { UserEntity } from './entities/user.entity';

export interface IDbQueryContext extends IDbContextBase {
  users: EntityRepository<UserEntity>;
}

@Injectable()
export class DbQueryContext implements IDbQueryContext {
  users: EntityRepository<UserEntity>;
  em: EntityManager;

  constructor(private readonly entityManager: EntityManager) {
    this.em = this.entityManager;
    this.users = this.em.getRepository(UserEntity);
  }
}