import z from 'zod';
import { SupplierCategory } from '@app/libs';
import { createZodDtoWithApiProperties } from '@app/libs/validation';

export const CreateSupplierRequestSchema = z.object({
  name: z.string().describe('Name of the supplier'),
  startWorkingTime: z.string(),
  endWorkingTime: z.string(),
  categories: z.array(z.nativeEnum(SupplierCategory)), // TODO: grpc find out enums
  address: z.object({
    floor: z.number(),
    street: z.string(),
  }),
});

export class CreateSupplierRequestDto extends createZodDtoWithApiProperties(
  CreateSupplierRequestSchema,
) {}
