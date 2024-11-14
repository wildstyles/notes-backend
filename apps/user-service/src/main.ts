import { setupGrpcMicroservice } from '@repo/common/grpc-client';

import { AppModule } from './app.module';

async function bootstrap() {
  await setupGrpcMicroservice(AppModule, 'UserService');
}
bootstrap();
