import { Injectable } from '@nestjs/common';

import { UserModel } from '../../../domain/user.model';
import { UserEntity } from '../entities/user.entity';

import { IMapper } from '@app/libs/database/base.repository';

@Injectable()
export class UserMapper implements IMapper<UserModel, UserEntity> {
  toDomain(entity: UserEntity) {
    return new UserModel({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      props: {
        name: entity.name,
        email: entity.email,
        age: entity.age,
        password: entity.password,
      },
    });
  }

  toEntityData(model: UserModel) {
    const props = model.getProps();

    return {
      id: props.id,
      name: props.name,
      email: props.email,
      password: props.password,
      age: props.age,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }
}
