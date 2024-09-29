import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';

import { SupplierEntity } from '../entities';

@Injectable()
export class SupplierRepository extends EntityRepository<SupplierEntity> {}
