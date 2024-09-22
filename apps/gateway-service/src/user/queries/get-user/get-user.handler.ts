import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GrpcClientService, GetUserResponse } from '@app/libs';
import { lastValueFrom } from 'rxjs';

import { GetUserQuery } from './get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly grpcClient: GrpcClientService<'UserService'>) {}

  async execute(query: GetUserQuery): Promise<GetUserResponse> {
    const result$ = this.grpcClient.methods.getUser(query);

    return lastValueFrom(result$);
  }
}
