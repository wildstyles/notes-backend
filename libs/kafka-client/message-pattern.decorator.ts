import { applyDecorators } from '@nestjs/common';
import { MessagePattern as NestMessagePattern } from '@nestjs/microservices';
import { KafkaSendMessagePattern } from './kafka-client.service';

export function MessagePattern(pattern: KafkaSendMessagePattern) {
  return applyDecorators(NestMessagePattern(pattern));
}
