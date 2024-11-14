import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import {
  DB_COMMAND_CONTEXT_TOKEN,
  DB_QUERY_CONTEXT_TOKEN,
  PgDatabaseModule,
  UserEntity,
} from '@repo/common/database';

import { DbCommandContext } from './db-command-context.service';
import { DbQueryContext } from './db-query-context.service';
import { UserMapper } from './mappers/user.mapper';
import { UserRepository } from './repositories/user.repository';

const mappers = [UserMapper];

const repositories = [UserRepository];

@Module({
  imports: [PgDatabaseModule, MikroOrmModule.forFeature([UserEntity])],
  providers: [
    ...repositories,
    ...mappers,
    { provide: DB_COMMAND_CONTEXT_TOKEN, useClass: DbCommandContext },
    { provide: DB_QUERY_CONTEXT_TOKEN, useClass: DbQueryContext },
  ],
  exports: [
    { provide: DB_COMMAND_CONTEXT_TOKEN, useClass: DbCommandContext },
    { provide: DB_QUERY_CONTEXT_TOKEN, useClass: DbQueryContext },
  ],
})
export class DatabaseModule {}
