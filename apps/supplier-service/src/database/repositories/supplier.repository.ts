import { EntityRepository } from '@mikro-orm/postgresql';

import { SupplierEntity } from '../entities';

export class SupplierRepository extends EntityRepository<SupplierEntity> {}
