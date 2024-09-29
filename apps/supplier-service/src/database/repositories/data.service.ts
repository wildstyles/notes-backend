import { Injectable } from '@nestjs/common';

import { IGenericRepository } from '@app/libs';

import { SupplierEntity, SupplyEntity } from '../entities';

import { SupplierRepository } from './supplier.repository';

export abstract class IDataService {
  suppliers: IGenericRepository<SupplierEntity>;
}

@Injectable()
export class DataService implements IDataService {
  suppliers: IGenericRepository<SupplierEntity>;

  constructor(private readonly supplierRepository: SupplierRepository) {
    this.suppliers = this.supplierRepository;
  }
}
