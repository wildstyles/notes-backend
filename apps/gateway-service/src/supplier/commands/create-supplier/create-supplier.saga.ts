import { CreateSupplierResponse, GrpcClientService } from '@app/libs';
import {
  ISagaStep,
  ISagaContext,
  SagaOrchestrator,
} from '@app/libs/saga/base.saga';

import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { CreateSupplierCommand } from './create-supplier.command';

interface InitialSagaContext extends ISagaContext<CreateSupplierCommand> {}

interface CreateSupplierStepContext {
  createSupplier?: CreateSupplierResponse;
}

interface SagaContext extends InitialSagaContext, CreateSupplierStepContext {}

class CreateSupplierSagaStep
  implements ISagaStep<SagaContext, CreateSupplierStepContext>
{
  constructor(
    private readonly grpcClient: GrpcClientService<'SupplierService'>,
  ) {}

  async execute(context: SagaContext) {
    const result$ = this.grpcClient.methods.createSupplier({
      name: context.initialParams.name,
      categories: [2],
      startWorkingTime: '08:00',
      endWorkingTime: '17:00',
      address: {
        street: '123 Street',
        floor: 1,
      },
    });

    const res = await lastValueFrom(result$);

    return { createSupplier: { id: res.id } };
  }

  async rollback(context: SagaContext) {
    if (!context.createSupplier) {
      throw new Error('Create supplier step must be executed');
    }

    const result$ = this.grpcClient.methods.rollbackCreateSupplier({
      id: context.createSupplier.id,
    });

    await lastValueFrom(result$);
  }
}

@Injectable()
export class CreateSupplierSaga extends SagaOrchestrator<
  SagaContext,
  [CreateSupplierSagaStep],
  CreateSupplierCommand
> {
  constructor(
    private readonly grpcClient: GrpcClientService<'SupplierService'>,
  ) {
    super([new CreateSupplierSagaStep(grpcClient)]);
  }
}
