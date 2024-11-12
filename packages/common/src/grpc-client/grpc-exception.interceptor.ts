import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError, catchError } from 'rxjs';
import { status as rpcStatusCode } from '@grpc/grpc-js';

import { HttpToGrpcExceptionFilter } from './grpc-exception.filter';

@Injectable()
export class GrpcExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((err) => {
        // catches ajv validation errors
        if (err instanceof BadRequestException) {
          return throwError(() => err);
        }

        // TODO: check for grpc error instance
        const code = err.code ?? rpcStatusCode.INTERNAL;

        const errCode =
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