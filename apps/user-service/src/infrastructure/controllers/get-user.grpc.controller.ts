import { Controller } from '@nestjs/common';
import {
  GrpcController,
  USER_SERVICE_NAME,
  GetUserRequest,
  GetUserResponse,
} from '@repo/common';

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
