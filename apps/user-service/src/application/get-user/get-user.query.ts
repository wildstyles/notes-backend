import { GetUserRequest, GetUserResponse } from '@repo/common/grpc-client';

export class GetUserQuery {
  readonly id: string;

  constructor(request: GetUserRequest) {
    this.id = request.id;
  }
}

export type GetUserQueryResponse = GetUserResponse;
