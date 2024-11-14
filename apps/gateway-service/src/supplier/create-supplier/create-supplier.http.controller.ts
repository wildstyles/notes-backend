import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateSupplierResponse } from '@repo/common/grpc-client';

import { routes } from '../../common/routes';
import { CreateSupplierCommand } from './create-supplier.command';
import { CreateSupplierRequestDto } from './create-supplier.request.dto';
import { CreateSupplierResponseDto } from './create-supplier.response.dto';

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
