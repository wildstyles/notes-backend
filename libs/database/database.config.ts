import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { config } from 'dotenv';
import * as path from 'path';
import { EnvironmentVariables } from '../config/env.validation';

// despite that we use ConfigService from @nestjs/config, which is a wrapper around dotenv,
// we still need to call config() to load the .env file. It allows us to run migrations from the host machine
config();

const configService = new ConfigService<EnvironmentVariables>();

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost', // it's localhost to allow to run migrations from the host machine
  port: configService.getOrThrow('DB_PORT'),
  username: configService.getOrThrow('DB_USER'),
  password: configService.getOrThrow('DB_PASSWORD'),
  database: configService.getOrThrow('DB_NAME'),

  synchronize: false,
  migrationsTableName: 'migrations',
  namingStrategy: new SnakeNamingStrategy(),
  entities: [__dirname + '../../../**/*.entity{.ts,.js}'],
  migrations: [path.resolve(__dirname, 'migrations', '**', '*{.ts,.js}')],
};

export default new DataSource(dataSourceConfig);
