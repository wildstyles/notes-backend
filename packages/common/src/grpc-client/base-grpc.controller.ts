import { Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { CreateRequestContext, EntityManager } from '@mikro-orm/core';

import {
  SUPPLIER_SERVICE_NAME,
  SupplierServiceController,
  USER_SERVICE_NAME,
  UserServiceController,
} from './interfaces';

type PickFn<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? K : never;
}[keyof T];

type OnlyFn<T> = Pick<T, PickFn<T>>;

type ServiceNameToController = {
  [SUPPLIER_SERVICE_NAME]: OnlyFn<SupplierServiceController>;
  [USER_SERVICE_NAME]: OnlyFn<UserServiceController>;
};

export const GrpcController = <
  S extends keyof ServiceNameToController,
  M extends keyof ServiceNameToController[S],
>(
  serviceName: S,
  method: M,
) => {
  type ControllerMethod = ServiceNameToController[S][M] extends (
    ...args: any
  ) => any
    ? ServiceNameToController[S][M]
    : never;

  abstract class Controller {
    @Inject(EntityManager)
    public readonly em: EntityManager;

    @GrpcMethod(serviceName, method as string)
    @CreateRequestContext()
    onRequest(
      request: Parameters<ControllerMethod>[0],
    ): ReturnType<ControllerMethod> {
      return this.handle(request);
    }

    abstract handle(
      request: Parameters<ControllerMethod>[0],
    ): ReturnType<ControllerMethod>;
  }

  return Controller;
};

export const GrpcRollbackController = <
  S extends keyof ServiceNameToController,
  M extends keyof ServiceNameToController[S],
  R extends Exclude<keyof ServiceNameToController[S], M>,
>(
  serviceName: S,
  method: M,
  rollbackMethod: R,
) => {
  type ControllerRollbackMethod = ServiceNameToController[S][R] extends (
    ...args: any
  ) => any
    ? ServiceNameToController[S][R]
    : never;

  abstract class ControllerWithRollback extends GrpcController(
    serviceName,
    method,
  ) {
    @GrpcMethod(serviceName, rollbackMethod as string)
    @CreateRequestContext()
    onRollback(
      request: Parameters<ControllerRollbackMethod>[0],
    ): ReturnType<ControllerRollbackMethod> {
      return this.rollback(request);
    }

    abstract rollback(
      request: Parameters<ControllerRollbackMethod>[0],
    ): ReturnType<ControllerRollbackMethod>;
  }

  return ControllerWithRollback;
};
