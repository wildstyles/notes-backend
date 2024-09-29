import { setupGrpcMicroservice } from '@app/libs';

import { AppModule } from './app.module';

async function bootstrap() {
  await setupGrpcMicroservice(AppModule, 'SupplierService');
}

bootstrap();
