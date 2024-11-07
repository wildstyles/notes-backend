import { Post, Controller, Body } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { routes } from 'apps/gateway-service/src/common';

import { CreateUserRequestDto } from './create-user.request.dto';
import { CreateUserResponseDto } from './create-user.response.dto';
import { CreateUserCommand } from './create-user.command';
import { CreateUserResponse } from '@app/libs';

@ApiTags(routes.createUser.apiTag)
@Controller()
export class CreateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routes.createUser.path())
  @ApiOkResponse({ type: CreateUserResponseDto })
  async createUser(
    @Body() body: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const command = new CreateUserCommand(body);

    const result: CreateUserResponse = await this.commandBus.execute(command);

    return new CreateUserResponseDto(result.id);
  }
}
