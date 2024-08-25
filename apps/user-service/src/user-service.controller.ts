import { Controller } from '@nestjs/common';
import { KafkaContext, Payload } from '@nestjs/microservices';
import { MessagePattern } from '@app/shared/modules/kafka-client/message-pattern.decorator';

type CreateUserInputDto = {
  username: string;
  password: string;
};

class CreateUserResultDto {
  message: string;
}

export interface IUserServiceController {
  createUser(
    message: CreateUserInputDto,
    context: KafkaContext,
  ): CreateUserResultDto;
}

@Controller()
export class UserServiceController implements IUserServiceController {
  @MessagePattern('user-service.createUser')
  createUser(@Payload() message: CreateUserInputDto) {
    return { message: null };
  }
}
