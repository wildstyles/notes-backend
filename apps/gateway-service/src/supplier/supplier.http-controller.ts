import { Controller, Param, Post, Put } from '@nestjs/common';
import { GrpcClientService } from '@app/libs/grpc-client/grpc-client.service';

@Controller('supplier')
export class SupplierHttpController {
  constructor(
    private readonly grpcClient: GrpcClientService<'SupplierService'>,
  ) {}

  @Post()
  async createSupplier() {
    return this.grpcClient.methods.createSupplier({
      name: 'Supplier 1',
      categories: [2],
      startWorkingTime: '08:00',
      endWorkingTime: '17:00',
      address: {
        street: '123 Street',
        floor: 1,
      },
    });
  }

  @Put(':id')
  async updateSupplier(@Param('id') id: string) {
    return this.grpcClient.methods.updateSupplier({
      id,
      name: 'Supplier 1',
      categories: [2],
      startWorkingTime: '08:00',
      endWorkingTime: '17:00',
      address: {
        street: '123 Street',
        floor: 1,
      },
    });
  }

  @Post(':id/supply')
  async createSupply(@Param('id') supplierId: string) {
    return this.grpcClient.methods.createSupply({
      supplierId,
      name: '',
      description: '',
      price: 100,
    });
  }
}
