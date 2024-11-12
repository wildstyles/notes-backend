import { AppModule } from './app.module';

import { createKafkaMicroservice } from '@repo/common/kafka-client/create-kafka-microservice';
import { setupGrpcMicroservice } from '@repo/common';

async function bootstrap() {
  // await createKafkaMicroservice(AppModule, 'user');
  await setupGrpcMicroservice(AppModule, 'UserService');
}
bootstrap();
