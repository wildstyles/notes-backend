import { setupGrpcMicroservice } from '@app/libs';

import { SupplierServiceModule } from './supplier-service.module';

async function bootstrap() {
  await setupGrpcMicroservice(SupplierServiceModule, 'SupplierService');
}

bootstrap();
