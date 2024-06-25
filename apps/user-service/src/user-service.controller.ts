import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class UserServiceController {
  @MessagePattern('medium.rocks')
  readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();

    const response =
      `Receiving a new message from topic: medium.rocks: ` +
      JSON.stringify(originalMessage.value);
    console.log(response);

    return 'hi from user service';
  }
}
