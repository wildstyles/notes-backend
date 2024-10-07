import { RequiredEntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { SupplierModel } from '../../domain/supplier.model';
import { SupplierEntity } from '../entities/supplier.entity';

import { IMapper } from '@app/libs/database/base.repository';

@Injectable()
export class SupplierMapper implements IMapper<SupplierModel, SupplierEntity> {
  toDomain(entity: SupplierEntity): SupplierModel {
    return new SupplierModel({
      id: entity.id,
      props: {
        supplies: [],
        name: entity.name,
        startWorkingTime: entity.startWorkingTime,
        endWorkingTime: entity.endWorkingTime,
      },
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toEntityData(model: SupplierModel): RequiredEntityData<SupplierEntity> {
    const props = model.getProps();

    return {
      id: props.id,
      name: props.name,
      startWorkingTime: props.startWorkingTime,
      endWorkingTime: props.endWorkingTime,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }
}
