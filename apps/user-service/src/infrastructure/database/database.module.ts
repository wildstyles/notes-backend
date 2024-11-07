import { Module } from '@nestjs/common';
import { PgDatabaseModule } from '@app/libs';

import { DbCommandContext } from './db-command-context.service';
import { DbQueryContext } from './db-query-context.service';
import { DB_COMMAND_CONTEXT_TOKEN, DB_QUERY_CONTEXT_TOKEN } from '@app/libs';
import { UserEntity } from './entities/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { UserRepository } from './repositories/user.repository';
import { UserMapper } from './mappers/user.mapper';

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
