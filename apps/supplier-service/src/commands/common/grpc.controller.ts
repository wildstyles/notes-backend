import { EntityManager, CreateRequestContext } from '@mikro-orm/core';
import { Inject } from '@nestjs/common';
import { SupplierServiceController, SUPPLIER_SERVICE_NAME } from '@app/libs';
import { GrpcMethod } from '@nestjs/microservices';

export abstract class GrpcController<
  M extends keyof SupplierServiceController,
> {
  @Inject(EntityManager)
  private readonly em: EntityManager;

  // TODO: mixins or decorators might help here
  // @GrpcMethod(SUPPLIER_SERVICE_NAME, 'createSupply')
  // @CreateRequestContext()
  onRequest(
    request: Parameters<SupplierServiceController[M]>[0],
  ): ReturnType<SupplierServiceController[M]> {
    return this.handle(request);
  }

  abstract handle(
    request: Parameters<SupplierServiceController[M]>[0],
  ): ReturnType<SupplierServiceController[M]>;
}
