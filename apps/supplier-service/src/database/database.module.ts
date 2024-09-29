import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PgDatabaseModule } from '@app/libs';
import { EntityManager } from '@mikro-orm/postgresql';

import { SupplierRepository, IDataService, DataService } from './repositories';
import { SupplierEntity, SupplyEntity } from './entities';

@Module({
  imports: [PgDatabaseModule],
  // providers: [SupplierRepository],
  // exports: [SupplierRepository],
})
export class DatabaseModule {}
