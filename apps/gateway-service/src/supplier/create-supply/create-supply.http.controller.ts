import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateSupplyResponse } from '@repo/common/grpc-client';

import { routes } from '../../common';
import { CreateSupplyCommand } from './create-supply.command';
import { CreateSupplyRequestDto } from './create-supply.request.dto';
import { CreateSupplyResponseDto } from './create-supply.response.dto';

@ApiTags(routes.createSupply.apiTag)
@Controller()
export class CreateSupplyHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routes.createSupply.path())
  @ApiOkResponse({
    type: CreateSupplyResponseDto,
    description: 'Returns id of newly created supply',
  })
  async createSupply(
    @Body() body: CreateSupplyRequestDto,
    @Param(routes.createSupply.params.supplierId!) supplierId: string,
  ): Promise<CreateSupplyResponseDto> {
    const command = new CreateSupplyCommand(body, supplierId);

    const result: CreateSupplyResponse = await this.commandBus.execute(command);

    return new CreateSupplyResponseDto(result.id);
  }
}
