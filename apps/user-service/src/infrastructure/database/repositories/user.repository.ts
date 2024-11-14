import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';

import { Repository, UserEntity } from '@repo/common/database';

import { UserModel } from '../../../domain/user.model';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepository extends Repository<UserModel, UserEntity> {
  constructor(
    protected readonly mapper: UserMapper,
    protected readonly em: EntityManager,
  ) {
    super(em.getRepository(UserEntity), mapper);
  }
}
