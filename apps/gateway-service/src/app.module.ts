import { Module } from '@nestjs/common';
import { LoggerModule } from '@app/libs/logger/logger.module';

import { UserModule } from './user/user.module';

@Module({
  imports: [LoggerModule.forRoot(), UserModule],
})
export class AppModule {}
