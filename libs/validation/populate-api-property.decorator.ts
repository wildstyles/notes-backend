import { z, ZodTypeDef, ZodSchema } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { SchemaObjectMetadata } from '@nestjs/swagger/dist/interfaces/schema-object-metadata.interface';
import { createZodDto, zodToOpenAPI, ZodDto } from 'nestjs-zod';

// TODO: optional type is not acceptable
export const createZodDtoWithApiProperties = <
  TOutput = any,
  TDef extends ZodTypeDef = ZodTypeDef,
  TInput = TOutput,
>(
  schema: ZodSchema<TOutput, TDef, TInput>,
) => {
  @PopulateApiProperty(schema)
  class PopulatedWithApiProperty extends createZodDto(schema as any) {}

  return PopulatedWithApiProperty as unknown as ZodDto<TOutput, TDef, TInput>;
};

export function PopulateApiProperty<
  TOutput = any,
  TDef extends ZodTypeDef = ZodTypeDef,
  TInput = TOutput,
>(schema: ZodSchema<TOutput, TDef, TInput>) {
  const openapi = zodToOpenAPI(schema);

  return function (constructor: Function) {
    for (const key in openapi.properties) {
      Reflect.decorate(
        // TODO: has poor required support
        [ApiProperty(openapi.properties[key] as SchemaObjectMetadata)],
        constructor.prototype,
        key,
      );
    }
  };
}

// function reassignRequiredToBoolean(
//   obj: any,
//   parentRequired: string[] = [],
// ): any {
//   if (obj.type !== 'object' || !obj.properties) {
//     return obj;
//   }

//   const newObj = { ...obj, properties: { ...obj.properties } };

//   for (const key in newObj.properties) {
//     newObj.properties[key] = reassignRequiredToBoolean(
//       newObj.properties[key],
//       newObj.properties[key].required || [],
//     );

//     newObj.properties[key].required = parentRequired.includes(key);
//   }

//   return newObj;
// }
