import { Test } from '@nestjs/testing';
import { setupTestGrpcMicroservice, SupplierCategory } from '@repo/common';
import { GrpcClientModule, GrpcClientService } from '@repo/common';
import { lastValueFrom } from 'rxjs';
import { INestApplication } from '@nestjs/common';
import { DB_QUERY_CONTEXT_TOKEN } from '@repo/common/database/base.repository';
import { DbQueryContext } from '../src/infrastructure/database/db-query-context.service';

import { AppModule } from '../src/app.module';

describe('CreateSupplierController', () => {
  let app: INestApplication;
  let client: GrpcClientService<'SupplierService'>;
  let dbQueryContext: DbQueryContext;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, GrpcClientModule.forRoot('SupplierService')],
    }).compile();

    app = await setupTestGrpcMicroservice(module, 'SupplierService');

    client = module.get(GrpcClientService<'SupplierService'>);
    dbQueryContext = module.get(DB_QUERY_CONTEXT_TOKEN);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('create-supplier', () => {
    const payload = {
      name: 'supplier',
      startWorkingTime: '10:00',
      endWorkingTime: '18:00',
      categories: [SupplierCategory.BURGER],
      address: { floor: 1, street: 'some avenue' },
    };

    it('should create a supplier with supply(from domain event)', async () => {
      const result$ = client.methods.createSupplier(payload);

      const response = await lastValueFrom(result$);

      const supplier = await dbQueryContext.suppliers.findOneOrFail(
        response.id,
      );
      const supplies = await dbQueryContext.supplies.find({ supplier });

      expect(supplies).toHaveLength(1);
      expect(supplies[0]!.name).toBe('Supply From Domain Event');
      expect(supplier.endWorkingTime).toBe(payload.endWorkingTime);
      expect(supplier.startWorkingTime).toBe(payload.startWorkingTime);
      expect(supplier.name).toBe(payload.name);
      expect(supplier.id).toBe(response.id);
    });
  });
});
