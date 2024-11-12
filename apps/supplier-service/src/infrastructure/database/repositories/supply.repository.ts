import { EntityRepository } from '@mikro-orm/postgresql';

import { SupplyEntity } from '@repo/common/database/entities/supply.entity';

export class SupplyRepository extends EntityRepository<SupplyEntity> {}
