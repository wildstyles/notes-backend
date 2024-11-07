import { Injectable } from '@nestjs/common';

import { QueryHandler } from '../common/query.handler';

import {
  GetUserQuery as Query,
  GetUserQueryResponse as Response,
} from './get-user.query';

@Injectable()
export class GetUserHandler extends QueryHandler<Query, Response> {
  async implementation(query: Query): Promise<Response> {
    const user = await this.dbContext.users.findOneOrFail(query.id);

    return { user };
  }
}
