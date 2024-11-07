import { GetUserRequest, GetUserResponse } from '@app/libs';

export class GetUserQuery {
  readonly id: string;

  constructor(request: GetUserRequest) {
    this.id = request.id;
  }
}

export type GetUserQueryResponse = GetUserResponse;
