import { Injectable } from '@nestjs/common';

import { IMapper, SupplyEntity } from '@repo/common/database';

import { SupplyModel } from '../../../domain/supply.model';

@Injectable()
export class SupplyMapper implements IMapper<SupplyModel, SupplyEntity> {
  toDomain(entity: SupplyEntity) {
    return new SupplyModel({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      props: {
        name: entity.name,
        supplierId: entity.supplier.id,
        description: entity.description,
        price: entity.price,
      },
    });
  }

  toEntityData(model: SupplyModel) {
    const props = model.getProps();

    return {
      id: props.id,
      name: props.name,
      supplier: props.supplierId,
      description: props.description,
      price: props.price,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }
}
