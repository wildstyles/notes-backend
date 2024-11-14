import { setupGrpcMicroservice } from '@repo/common/grpc-client';

import { AppModule } from './app.module';

async function bootstrap() {
  console.log();
  await setupGrpcMicroservice(AppModule, 'SupplierService');
}

bootstrap();
