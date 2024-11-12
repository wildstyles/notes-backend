import { Inject } from '@nestjs/common';
import { IDbContextBase, DB_QUERY_CONTEXT_TOKEN } from '../database';

export interface IQuery {}

export interface IQueryHandler<TQuery extends IQuery = any, TResult = any> {
  execute(command: TQuery): Promise<TResult>;
}

export abstract class QueryHandler<
  Query extends IQuery,
  Response,
  DbContext extends IDbContextBase = IDbContextBase,
> implements IQueryHandler<Query, Response>
{
  @Inject(DB_QUERY_CONTEXT_TOKEN)
  protected readonly dbContext: DbContext;

  async execute(query: Query): Promise<Response> {
    const result = await this.implementation(query);

    return result;
  }

  abstract implementation(query: Query): Promise<Response>;
}
