import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { GetUserResponse } from '@repo/common/grpc-client';

import { routes } from '../../common';
import { GetUserQuery } from './get-user.query';
import { GetUserResponseDto } from './get-user.response.dto';

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
