import {
  UserServiceController,
  UserServiceControllerMethods,
  GetUserRequest,
  GetUserResponse,
  CreateUserRequest,
  CreateUserResponse,
} from '@app/libs/grpc-client/interfaces/user-service';
import { Controller } from '@nestjs/common';

@Controller()
@UserServiceControllerMethods()
export class UserServiceGrpcController implements UserServiceController {
  getUser(request: GetUserRequest): CreateUserResponse {
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
