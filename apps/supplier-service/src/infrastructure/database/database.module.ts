import { Module } from '@nestjs/common';
import { PgDatabaseModule } from '@app/libs';

import { DbCommandContext } from './db-command-context.service';
import { DbQueryContext } from './db-query-context.service';
import { DB_COMMAND_CONTEXT_TOKEN, DB_QUERY_CONTEXT_TOKEN } from '@app/libs';
import { SupplierEntity, SupplyEntity } from './entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { SupplierRepository } from './repositories';
import { SupplierMapper, SupplyMapper } from './mappers';

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
