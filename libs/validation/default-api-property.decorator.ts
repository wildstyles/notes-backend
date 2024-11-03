import 'reflect-metadata';
import { z, ZodTypeDef, ZodSchema } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { createZodDto, zodToOpenAPI } from 'nestjs-zod';

// TODO: optional type is not acceptable
// export const createZodDtoWithApiProperties = <T extends z.ZodRawShape>(
//   schema: z.ZodObject<T>,
// ) => {
//   @PopulateApiProperty(schema)
//   class PopulatedWithApiProperty extends createZodDto(schema as ZodSchema) {}

//   return PopulatedWithApiProperty;
// };

function createNestedClass(schema: z.ZodObject<any>, key: string): any {
  // keys with same name won't allow to create objects inside objects
  const Nested = {
    [key]: class {},
  }[key];

  PopulateApiProperty(schema)(Nested!);

  return Nested;
}

function getTypeFromZodSchema(
  schema: z.ZodSchema,
): [
  (
    | StringConstructor
    | NumberConstructor
    | BooleanConstructor
    | ArrayConstructor
    | ObjectConstructor
  ),
  any,
  any,
] {
  let unwrappedSchema = schema;
  let defaultValue;

  if (unwrappedSchema instanceof z.ZodDefault) {
    defaultValue = unwrappedSchema._def.defaultValue();
    unwrappedSchema = unwrappedSchema._def.innerType;
  }

  while (
    unwrappedSchema instanceof z.ZodOptional ||
    unwrappedSchema instanceof z.ZodNullable
  ) {
    unwrappedSchema = unwrappedSchema.unwrap();
  }

  if (unwrappedSchema instanceof z.ZodDefault) {
    defaultValue = unwrappedSchema._def.defaultValue();
    unwrappedSchema = unwrappedSchema._def.innerType;
  }

  if (unwrappedSchema instanceof z.ZodNumber) {
    return [Number, unwrappedSchema, defaultValue];
  } else if (unwrappedSchema instanceof z.ZodBoolean) {
    return [Boolean, unwrappedSchema, defaultValue];
  } else if (unwrappedSchema instanceof z.ZodArray) {
    return [Array, unwrappedSchema, defaultValue];
  } else if (unwrappedSchema instanceof z.ZodObject) {
    return [Object, unwrappedSchema, defaultValue];
  } else if (unwrappedSchema instanceof z.ZodNativeEnum) {
    return [unwrappedSchema._def.values, unwrappedSchema, defaultValue];
  }

  return [String, unwrappedSchema, defaultValue];
}

function PopulateApiProperty<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  const shape = schema.shape;

  return function (constructor: Function) {
    for (const key in shape) {
      const propertySchema = shape[key];

      const [rootType, unwrapped, defaultV] = getTypeFromZodSchema(
        propertySchema as any,
      );

      let defaultValue = defaultV;

      let type =
        rootType === Object ? createNestedClass(unwrapped, key) : rootType;

      const isEnum =
        unwrapped instanceof z.ZodNativeEnum ||
        (type === Array && unwrapped.element instanceof z.ZodNativeEnum);

      // add unions
      // api extra models - discriminator
      if (type === Array) {
        const arrayItemsSchema = unwrapped.element;
        const [arrayItemsType, unwrappedSchema, defaultVal] =
          getTypeFromZodSchema(arrayItemsSchema);

        type =
          arrayItemsType === Object
            ? createNestedClass(unwrappedSchema, key)
            : arrayItemsType;
      }

      Reflect.decorate(
        [
          ApiProperty(zodToOpenAPI(propertySchema as any) as any),
          ApiProperty({
            default: defaultValue,
            nullable: propertySchema?.isNullable(),
            required: !propertySchema?.isOptional(),
            isArray: rootType === Array,
            ...(isEnum ? { enum: type } : { type }),
            description: propertySchema?.description, // maybe assign to example is better
          }),
        ],
        constructor.prototype,
        key,
      );
    }
  };
}
