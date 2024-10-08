import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateSupplierResponse } from '@app/libs';
import { CreateSupplierRequestDto, CreateSupplierResponseDto } from './dto';
import { CreateSupplierCommand } from '.';

import { routes } from 'apps/gateway-service/src/common/routes';

@ApiTags(routes.createSupplier.apiTag)
@Controller()
export class CreateSupplierHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routes.createSupplier.path())
  @ApiOkResponse({
    type: CreateSupplierResponseDto,
    description: 'Returns id of newly created supplier',
  })
  async createSupplier(
    @Body() body: CreateSupplierRequestDto,
  ): Promise<CreateSupplierResponseDto> {
    const command = new CreateSupplierCommand(body);

    const result = await this.commandBus.execute<
      CreateSupplierCommand,
      CreateSupplierResponse
    >(command);

    return new CreateSupplierResponseDto(result.id);
  }
}
