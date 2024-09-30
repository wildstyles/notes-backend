import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { EnvironmentVariables } from '../config/env.validation';

import { defineConfig } from '@mikro-orm/postgresql';

import { SupplierEntity } from '../../apps/supplier-service/src/database/entities/supplier.entity';
import { SupplyEntity } from '../../apps/supplier-service/src/database/entities/supply.entity';
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
  host: 'localhost',
  entities: [SupplierEntity, BaseEntity, SupplyEntity],
  entitiesTs: [SupplierEntity, BaseEntity, SupplyEntity],
});
