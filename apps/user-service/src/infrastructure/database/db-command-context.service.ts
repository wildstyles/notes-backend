import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { IDbContextBase } from '@repo/common/database/base.repository';

import { UserRepository } from './repositories/user.repository';

export interface IDbCommandContext extends IDbContextBase {
  users: UserRepository;
}

@Injectable()
export class DbCommandContext implements IDbCommandContext {
  users: UserRepository;
  em: EntityManager;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly entityManager: EntityManager,
  ) {
    this.em = this.entityManager;
    this.users = this.userRepository;
  }
}
