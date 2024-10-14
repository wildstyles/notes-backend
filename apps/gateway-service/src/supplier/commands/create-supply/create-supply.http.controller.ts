import { Controller, Post, Body, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateSupplyCommand } from './';
import { CreateSupplyRequestDto, CreateSupplyResponseDto } from './dto';

import { routes } from 'apps/gateway-service/src/common/routes';
import { CreateSupplyResponse } from '@app/libs';

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
