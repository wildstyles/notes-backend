import { EntityRepository } from '@mikro-orm/postgresql';

import { SupplyEntity } from '@repo/common/database';

export class SupplyRepository extends EntityRepository<SupplyEntity> {}
