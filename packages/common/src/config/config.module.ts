import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { ConfigService } from './config.service';
import { validate } from './env.validation';

// @Global()
@Module({
  imports: [NestConfigModule.forRoot({ validate })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
