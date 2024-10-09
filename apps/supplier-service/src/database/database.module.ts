import { Module } from '@nestjs/common';
import { PgDatabaseModule } from '@app/libs';

import { IPersistenceService, PersistenceService } from './persistence.service';
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
    { provide: IPersistenceService, useClass: PersistenceService },
  ],
  exports: [IPersistenceService],
})
export class DatabaseModule {}
