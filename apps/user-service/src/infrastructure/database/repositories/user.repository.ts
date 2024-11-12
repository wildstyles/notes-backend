import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { Repository } from '@repo/common/database/base.repository';

import { UserModel } from '../../../domain/user.model';
import { UserEntity } from '@repo/common/database/entities/user.entity';
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
