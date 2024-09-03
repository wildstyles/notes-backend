import { AppModule } from './app.module';

import { createKafkaMicroservice } from '@app/libs/kafka-client/create-kafka-microservice';
import { createGrpcMicroservice } from '@app/libs/grpc-client/create-grpc-microservice';

async function bootstrap() {
  await createKafkaMicroservice(AppModule, 'user');
  await createGrpcMicroservice(AppModule, 'UserService');
}
bootstrap();
