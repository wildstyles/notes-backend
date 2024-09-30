import { Module } from '@nestjs/common';
import { PgDatabaseModule } from '@app/libs';

import { IPersistenceService, PersistenceService } from './persistence.service';
import { SupplierEntity, SupplyEntity } from './entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    PgDatabaseModule,
    MikroOrmModule.forFeature([SupplierEntity, SupplyEntity]),
  ],
  providers: [{ provide: IPersistenceService, useClass: PersistenceService }],
  exports: [IPersistenceService],
})
export class DatabaseModule {}
