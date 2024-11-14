import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import {
  DB_COMMAND_CONTEXT_TOKEN,
  DB_QUERY_CONTEXT_TOKEN,
  PgDatabaseModule,
  SupplierEntity,
  SupplyEntity,
} from '@repo/common/database';

import { DbCommandContext } from './db-command-context.service';
import { DbQueryContext } from './db-query-context.service';
import { SupplierMapper, SupplyMapper } from './mappers';
import { SupplierRepository } from './repositories';

const mappers = [SupplierMapper, SupplyMapper];

const repositories = [SupplierRepository];

@Module({
  imports: [
    PgDatabaseModule,
    MikroOrmModule.forFeature([SupplierEntity, SupplyEntity]),
  ],
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
