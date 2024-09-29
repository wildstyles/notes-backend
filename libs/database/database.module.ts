import { Module, Scope } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { ConfigModule, ConfigService } from '../config';
import mikroOrmConfig from './mikro-orm.config';
// https://medium.com/brain-station-23/repository-pattern-for-data-access-in-nestjs-using-typeorm-bbf0a92d6d7c
@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { host } = configService.get('db');

        return {
          ...mikroOrmConfig,
          driver: PostgreSqlDriver,
          host,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class PgDatabaseModule {}
