import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { GrpcClientModule } from '@app/libs/grpc-client';

import { GetUserHandler, GetUserHttpController } from './get-user';
import { CreateUserHandler, CreateUserHttpController } from './create-user';

const httpControllers = [GetUserHttpController, CreateUserHttpController];

const queryHandlers = [GetUserHandler, CreateUserHandler];

@Module({
  imports: [CqrsModule, GrpcClientModule.forRoot('UserService')],
  controllers: [...httpControllers],
  providers: [...queryHandlers],
})
export class UserModule {}
