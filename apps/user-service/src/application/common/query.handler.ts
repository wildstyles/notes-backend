import { QueryHandler as BaseQueryHandler } from '@repo/common/cqrs';

import { IDbQueryContext } from '../../infrastructure/database/db-query-context.service';

export abstract class QueryHandler<
  Query extends object,
  Response,
> extends BaseQueryHandler<Query, Response, IDbQueryContext> {}
