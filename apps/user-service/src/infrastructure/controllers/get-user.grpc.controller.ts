import { Controller } from '@nestjs/common';

import {
  GetUserRequest,
  GetUserResponse,
  GrpcController,
  USER_SERVICE_NAME,
} from '@repo/common/grpc-client';

import { GetUserHandler, GetUserQuery } from '../../application';

@Controller()
export class GetUserGrpcController extends GrpcController(
  USER_SERVICE_NAME,
  'getUser',
) {
  constructor(private readonly handler: GetUserHandler) {
    super();
  }

  async handle(request: GetUserRequest): Promise<GetUserResponse> {
    const query = new GetUserQuery(request);

    const result = await this.handler.execute(query);

    return result;
  }
}
