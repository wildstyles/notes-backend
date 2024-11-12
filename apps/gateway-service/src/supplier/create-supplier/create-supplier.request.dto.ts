import { Type } from '@sinclair/typebox';
import { SupplierCategory, createAjvDto, EnumByKey } from '@repo/common';

export const CreateSupplierRequestSchema = Type.Object({
  name: Type.String({ description: 'Supplier name' }),
  startWorkingTime: Type.String(),
  endWorkingTime: Type.String(),
  categories: Type.Array(EnumByKey(SupplierCategory)),
  address: Type.Object({
    floor: Type.Number(),
    street: Type.String()
  }),
});

export class CreateSupplierRequestDto extends createAjvDto(
  CreateSupplierRequestSchema,
) {}
