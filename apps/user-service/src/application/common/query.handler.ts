import {
  QueryHandler as BaseQueryHandler,
  IQuery,
} from '@app/libs/cqrs/query.handler';

import { IDbQueryContext } from '../../infrastructure/database/db-query-context.service';

export abstract class QueryHandler<
  Query extends IQuery,
  Response,
> extends BaseQueryHandler<Query, Response, IDbQueryContext> {}
