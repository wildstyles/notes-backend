import { Controller } from '@nestjs/common';
import { KafkaContext } from '@nestjs/microservices';
import { MessagePattern } from '@app/libs/kafka-client/message-pattern.decorator';

type CreateUserInputDto = {
  username: string;
  password: string;
};

class CreateUserResultDto {
  message: string;
}

export interface IUserServiceController {
  deleteUser(): void;
  createUser(
    message: CreateUserInputDto,
    context: KafkaContext,
  ): CreateUserResultDto;
}

@Controller()
export class UserServiceKafkaController implements IUserServiceController {
  // @MessagePattern('user-service.createUser')
  createUser() {
    return { message: null };
  }

  deleteUser(): void {}
}
