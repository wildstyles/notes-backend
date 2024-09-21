import { Controller } from '@nestjs/common';

import {
  SupplierServiceControllerMethods,
  SupplierServiceController,
  CreateSupplierRequest,
  CreateSupplierResponse,
  UpdateSupplierRequest,
  UpdateSupplierResponse,
  CreateSupplyRequest,
  CreateSupplyResponse,
} from '@app/libs/grpc-client';

@Controller()
@SupplierServiceControllerMethods()
export class SupplierServiceGrpcController
  implements SupplierServiceController
{
  async createSupplier(
    request: CreateSupplierRequest,
  ): Promise<CreateSupplierResponse> {
    console.log(request, 'REQUEST');

    return {
      supplier: {
        ...request,
        id: '1',
      },
    };
  }

  async updateSupplier(
    request: UpdateSupplierRequest,
  ): Promise<UpdateSupplierResponse> {
    console.log(request, 'REQUEST');

    return { supplier: { id: '1', ...request } };
  }

  async createSupply(
    request: CreateSupplyRequest,
  ): Promise<CreateSupplyResponse> {
    console.log(request, 'REQUEST');

    return { supply: { id: '1', ...request } };
  }
}
