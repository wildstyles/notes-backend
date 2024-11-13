import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import mikroOrmConfig from './mikro-orm.config';

// https://medium.com/brain-station-23/repository-pattern-for-data-access-in-nestjs-using-typeorm-bbf0a92d6d7c
@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: () => {
        return {
          ...mikroOrmConfig,
          driver: PostgreSqlDriver,
        };
      },
    }),
  ],
})
export class PgDatabaseModule {}
