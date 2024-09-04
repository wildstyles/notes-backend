import {
  UserServiceController,
  UserServiceControllerMethods,
  GetUserRequest,
  GetUserResponse,
  CreateUserRequest,
  CreateUserResponse,
} from '@app/libs/grpc-client/interfaces/user-service';
import { Controller, Logger } from '@nestjs/common';

@Controller()
@UserServiceControllerMethods()
export class UserServiceGrpcController implements UserServiceController {
  private readonly logger = new Logger(UserServiceGrpcController.name);

  getUser(request: GetUserRequest): CreateUserResponse {
    this.logger.debug('getUser');

    return {
      user: {
        id: '1',
        name: 'John Doe',
        email: '',
        age: 0,
        address: { street: '', city: '' },
      },
    };
  }

  createUser(request: CreateUserRequest): GetUserResponse {
    return { user: undefined };
  }
}
