import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Migrator } from '@mikro-orm/migrations';
import { EnvironmentVariables, nodeEnv } from '../config/env.validation';

import { defineConfig } from '@mikro-orm/postgresql';
import * as path from 'path';

import { SupplyEntity, SupplierEntity, UserEntity } from './entities';
import { BaseEntity } from './base.entity';

// despite that we use ConfigService from @nestjs/config, which is a wrapper around dotenv,
// we still need to call config() to load the .env file. It allows us to run migrations from the host machine
config();

const configService = new ConfigService<EnvironmentVariables>();

export default defineConfig({
  port: configService.getOrThrow('DB_PORT'),
  user: configService.getOrThrow('DB_USER'),
  password: configService.getOrThrow('DB_PASSWORD'),
  dbName: configService.getOrThrow('DB_NAME'),
  host:
    configService.getOrThrow('NODE_ENV') === nodeEnv.development
      ? configService.getOrThrow('DB_HOST')
      : 'localhost',
  debug: configService.getOrThrow('NODE_ENV') !== nodeEnv.test,
  allowGlobalContext: configService.getOrThrow('NODE_ENV') === nodeEnv.test,
  migrations: {
    path: path.join(__dirname, './migrations'),
    pathTs: path.join(__dirname, './migrations'),
    tableName: 'migrations',
    snapshot: false,
    fileName: (timestamp: string, name?: string) => {
      if (!name) {
        throw new Error(
          'Specify migration name via `yarn migration:create --name=...`',
        );
      }

      return `${timestamp}_${name}`;
    },
  },
  extensions: [Migrator],
  entities: [SupplierEntity, BaseEntity, UserEntity, SupplyEntity],
  entitiesTs: [SupplierEntity, BaseEntity, UserEntity, SupplyEntity],
});