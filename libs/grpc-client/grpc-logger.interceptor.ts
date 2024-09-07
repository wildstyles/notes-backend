import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { ServiceName } from './grpc-client.service';
import { Metadata } from '@grpc/grpc-js';

export const REQUEST_ID_METADATA_KEY = 'reqId';

@Injectable()
export class GrpcLoggerInterceptor implements NestInterceptor {
  private logger: Logger;

  constructor(private readonly serviceName: ServiceName) {
    this.logger = new Logger(this.serviceName);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const reqBody = context.switchToRpc().getData();
    const method = context.getHandler().name;
    const contextType = context.getType();
    const controllerName = context.getClass().name;
    const metadata = context.switchToRpc().getContext<Metadata>();

    const reqId = metadata.get(REQUEST_ID_METADATA_KEY);

    this.logger.debug(
      `${reqId} [${contextType}]:[${controllerName}]:[${method}] REQ:-> ${JSON.stringify(
        reqBody,
      )}`,
    );

    return next.handle().pipe(
      tap((data) => {
        this.logger.debug(
          `${reqId} [${contextType}]:[${controllerName}]:[${method}] RES:-> ${JSON.stringify(
            data,
          )}`,
        );
      }),
    );
  }
}
