import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { GrpcClientModule } from '@app/libs/grpc-client';

import { GetUserHandler, GetUserHttpController } from './get-user';

const httpControllers = [GetUserHttpController];

const queryHandlers = [GetUserHandler];

@Module({
  imports: [CqrsModule, GrpcClientModule.forRoot('UserService')],
  controllers: [...httpControllers],
  providers: [...queryHandlers],
})
export class UserModule {}
