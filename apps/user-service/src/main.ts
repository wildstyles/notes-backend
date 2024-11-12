import { setupGrpcMicroservice } from '@repo/common';
import { createKafkaMicroservice } from '@repo/common/kafka-client/create-kafka-microservice';

import { AppModule } from './app.module';

async function bootstrap() {
  // await createKafkaMicroservice(AppModule, 'user');
  await setupGrpcMicroservice(AppModule, 'UserService');
}
bootstrap();
