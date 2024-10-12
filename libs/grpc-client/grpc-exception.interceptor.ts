import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Observable, throwError, catchError } from 'rxjs';
import { status as rpcStatusCode } from '@grpc/grpc-js';

import { HttpToGrpcExceptionFilter } from './grpc-exception.filter';

@Injectable()
export class GrpcExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((err) => {
        const code = err.code ?? rpcStatusCode.INTERNAL;

        let errCode =
          Object.keys(HttpToGrpcExceptionFilter.HttpToRpcStatusCode).find(
            (k) =>
              HttpToGrpcExceptionFilter.HttpToRpcStatusCode[Number(k)] === code,
          ) || 500;

        return throwError(
          () => new HttpException(err.details, Number(errCode)),
        );
      }),
    );
  }
}
