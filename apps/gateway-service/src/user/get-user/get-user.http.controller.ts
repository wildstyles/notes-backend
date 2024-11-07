import { Get, Controller, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { routes } from 'apps/gateway-service/src/common';

import { GetUserQuery } from './get-user.query';
import { GetUserResponseDto } from './get-user.response.dto';
import { GetUserResponse } from '@app/libs';

@ApiTags(routes.getUser.apiTag)
@Controller()
export class GetUserHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routes.getUser.path())
  @ApiOkResponse({ type: GetUserResponseDto })
  async getUser(
    @Param(routes.getUser.params.id!) id: string,
  ): Promise<GetUserResponseDto> {
    const query = new GetUserQuery(id);

    const result: GetUserResponse = await this.queryBus.execute(query);

    return new GetUserResponseDto(result);
  }
}
