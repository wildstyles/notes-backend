import { EntityManager, CreateRequestContext } from '@mikro-orm/core';
import { Inject } from '@nestjs/common';
import { SupplierServiceController, SUPPLIER_SERVICE_NAME } from '@app/libs';
import { GrpcMethod } from '@nestjs/microservices';

export const GrpcController = <M extends keyof SupplierServiceController>(
  method: M,
) => {
  abstract class Controller {
    @Inject(EntityManager)
    public readonly em: EntityManager;

    @GrpcMethod(SUPPLIER_SERVICE_NAME, method)
    @CreateRequestContext()
    onRequest(
      request: Parameters<SupplierServiceController[M]>[0],
    ): ReturnType<SupplierServiceController[M]> {
      return this.handle(request);
    }

    abstract handle(
      request: Parameters<SupplierServiceController[M]>[0],
    ): ReturnType<SupplierServiceController[M]>;
  }

  return Controller;
};

export const GrpcRollbackController = <
  M extends keyof SupplierServiceController,
  R extends keyof SupplierServiceController,
>(
  method: M,
  rollbackMethod: R,
) => {
  abstract class ControllerWithRollback extends GrpcController(method) {
    @GrpcMethod(SUPPLIER_SERVICE_NAME, rollbackMethod)
    @CreateRequestContext()
    onRollback(
      request: Parameters<SupplierServiceController[R]>[0],
    ): ReturnType<SupplierServiceController[R]> {
      return this.rollback(request);
    }

    abstract rollback(
      request: Parameters<SupplierServiceController[R]>[0],
    ): ReturnType<SupplierServiceController[R]>;
  }

  return ControllerWithRollback;
};
