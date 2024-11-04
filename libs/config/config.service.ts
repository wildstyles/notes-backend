import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { EnvironmentVariables } from './env.validation';

interface Config {
  db: {
    port: string;
    host: string;
    username: string;
    name: string;
    password: string;
  };
}

@Injectable()
export class ConfigService {
  private readonly config: Config;

  constructor(
    private readonly nestConfigService: NestConfigService<EnvironmentVariables>,
  ) {
    this.config = {
      db: {
        port: this.nestConfigService.getOrThrow('DB_PORT'),
        host: this.nestConfigService.getOrThrow('DB_HOST'),
        username: this.nestConfigService.getOrThrow('DB_USER'),
        name: this.nestConfigService.getOrThrow('DB_NAME'),
        password: this.nestConfigService.getOrThrow('DB_PASSWORD'),
      },
    };
  }

  get<K extends keyof Config>(key: K): Config[K] {
    return this.config[key];
  }
}
