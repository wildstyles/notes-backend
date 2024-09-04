import { AppModule } from './app.module';

import { createKafkaMicroservice } from '@app/libs/kafka-client/create-kafka-microservice';
import { setupGrpcMicroservice } from '@app/libs/grpc-client/setup-grpc-microservice';

async function bootstrap() {
  // await createKafkaMicroservice(AppModule, 'user');
  await setupGrpcMicroservice(AppModule, 'UserService');
}
bootstrap();
