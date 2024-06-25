import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka, ServerKafka } from '@nestjs/microservices';

enum MessagePattern {
  'medium.rocks',
}

@Injectable()
export class KafkaClientService {
  constructor(private readonly client: ClientKafka) {}

  public emit(pattern: any, data = {}) {
    return this.client.emit(pattern, data);
  }

  public send(pattern: any, data = {}) {
    return this.client.send(pattern, data);
  }

  public subscribeToResponseOf(pattern: any) {
    return this.client.subscribeToResponseOf(pattern);
  }
}
