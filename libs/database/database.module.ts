import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '../config';

import { dataSourceConfig } from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { host } = configService.get('db');

        return {
          ...dataSourceConfig,
          host,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
