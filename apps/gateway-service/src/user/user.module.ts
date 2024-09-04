import { Module } from '@nestjs/common';

import { UserHttpController } from './user.http.controller';
import { GrpcClientModule } from '@app/libs/grpc-client/grpc-client.module';
import { KafkaClientModule } from '@app/libs';

@Module({
  imports: [
    GrpcClientModule.forRoot('UserService'),
    // KafkaClientModule.forRoot('gateway'),
  ],
  controllers: [UserHttpController],
  providers: [],
})
export class UserModule {}
