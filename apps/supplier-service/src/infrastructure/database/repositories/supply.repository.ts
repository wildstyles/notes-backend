import { EntityRepository } from '@mikro-orm/postgresql';

import { SupplyEntity } from '../entities';

export class SupplyRepository extends EntityRepository<SupplyEntity> {}
