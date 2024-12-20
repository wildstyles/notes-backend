import { Entity, EntityRepositoryType } from '@mikro-orm/core';

import { SupplyEntity as BaseSupplyEntity } from '@repo/common/database';

import { SupplyRepository } from '../repositories/supply.repository';

// to write custom repository, but without ddd mappings we must provide repository param in @Entity
@Entity({ tableName: 'supplies', repository: () => SupplyRepository })
export class SupplyEntity extends BaseSupplyEntity {
  [EntityRepositoryType]?: SupplyRepository;
}
