import {
  SupplierModel,
  CreateSupplierProps,
  AddSupplyProps,
} from '../supplier.model';
import { SupplierCreatedDomainEvent } from '../events/supplier-created.domain-event';
import { MaxSuppliesReachedError } from '../supplier.errors';
import { SupplyModel } from '../supply.model';

describe('SupplierModel', () => {
  const payload: CreateSupplierProps = {
    name: 'Supplier 1',
    startWorkingTime: '08:00',
    endWorkingTime: '17:00',
  };

  describe('create', () => {
    const addEventSpy = jest.spyOn(SupplierModel.prototype as any, 'addEvent');

    afterAll(() => {
      addEventSpy.mockRestore();
    });

    it('should create a new supplier', () => {
      const supplier = SupplierModel.create(payload);
      const props = supplier.getProps();

      expect(addEventSpy).toHaveBeenCalledTimes(1);
      expect(addEventSpy).toHaveBeenCalledWith(
        new SupplierCreatedDomainEvent({
          aggregateId: props.id,
          supplierName: props.name,
        }),
      );
      expect(props.supplies).toHaveLength(0);
      expect(props).toEqual(expect.objectContaining(payload));
    });
  });

  describe('addSupply', () => {
    let supplier: SupplierModel;
    const supplyPayload: AddSupplyProps = {
      name: 'Supply 1',
      price: 100,
      description: 'Wine',
    };

    beforeEach(() => {
      supplier = SupplierModel.create(payload);
    });

    it('should return an error if the supplier has reached the supplies count', () => {
      [...Array(SupplierModel.MAX_SUPPLIES_COUNT)].forEach(() => {
        supplier.addSupply(supplyPayload);
      });

      const result = supplier.addSupply(supplyPayload);

      expect(result.unwrapErr()).toBeInstanceOf(MaxSuppliesReachedError);
    });

    it('should add a new supply', () => {
      const createSupplySpy = jest.spyOn(SupplyModel, 'create');
      const result = supplier.addSupply(supplyPayload).unwrap();

      const props = supplier.getProps();

      expect(createSupplySpy).toHaveBeenCalledTimes(1);
      expect(createSupplySpy).toHaveBeenCalledWith({
        ...supplyPayload,
        supplierId: props.id,
      });

      expect(props.supplies).toHaveLength(1);
      expect(props.supplies).toContainEqual(
        expect.objectContaining({
          id: result,
          props: { ...supplyPayload, supplierId: props.id },
        }),
      );
    });
  });
});
