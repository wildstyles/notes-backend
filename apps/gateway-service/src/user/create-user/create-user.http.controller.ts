import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserResponse } from '@repo/common';

import { routes } from '../../common';
import { CreateUserCommand } from './create-user.command';
import { CreateUserRequestDto } from './create-user.request.dto';
import { CreateUserResponseDto } from './create-user.response.dto';

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
