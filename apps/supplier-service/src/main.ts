import { setupGrpcMicroservice } from '@repo/common';

import { AppModule } from './app.module';

async function bootstrap() {
  console.log();
  await setupGrpcMicroservice(AppModule, 'SupplierService');
}

bootstrap();
