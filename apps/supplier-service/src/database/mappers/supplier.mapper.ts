import { Injectable, NotImplementedException } from '@nestjs/common';

import { SupplierModel } from '../../domain/supplier.model';
import { SupplierEntity } from '../entities/supplier.entity';

import { RequiredEntityData, Primary } from '@mikro-orm/core';

import { IMapper } from '@app/libs/database/base.repository';
import { SupplyMapper } from './supply.mapper';

@Injectable()
export class SupplierMapper implements IMapper<SupplierModel, SupplierEntity> {
  constructor(private readonly supplyMapper: SupplyMapper) {}

  toDomain(entity: SupplierEntity): SupplierModel {
    if (!entity.supplies.isInitialized()) {
      throw new NotImplementedException(
        'Supplies collection is not initialized',
      );
    }

    const supplies = entity.supplies.getItems().map(this.supplyMapper.toDomain);

    return new SupplierModel({
      id: entity.id,
      props: {
        supplies,
        name: entity.name,
        startWorkingTime: entity.startWorkingTime,
        endWorkingTime: entity.endWorkingTime,
      },
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toEntityData(model: SupplierModel) {
    const props = model.getProps();

    return {
      id: props.id,
      name: props.name,
      supplies: props.supplies.map(this.supplyMapper.toEntityData),
      startWorkingTime: props.startWorkingTime,
      endWorkingTime: props.endWorkingTime,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }
}
