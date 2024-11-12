import { GetUserRequest, GetUserResponse } from '@repo/common';

export class GetUserQuery {
  readonly id: string;

  constructor(request: GetUserRequest) {
    this.id = request.id;
  }
}

export type GetUserQueryResponse = GetUserResponse;
