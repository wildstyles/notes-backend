import { type Static, TObject, TProperties, Type } from '@sinclair/typebox';
import { ApiProperty } from '@nestjs/swagger';

export const StringEnum = <T extends string[]>(values: [...T]) =>
  Type.Unsafe<T[number]>({
    type: 'string',
    enum: values,
  });

export const EnumByKey = <T extends Record<string, number>>(enumObj: T) => {
  const values = Object.keys(enumObj) as Array<keyof T>;

  return Type.Unsafe<(typeof values)[number]>({
    type: 'string',
    enum: values,
  });
};

export interface AjvDto<T extends TProperties> {
  new (): Static<TObject<T>>;
  isAjvDto: true;
  schema: TObject<T>;
}

export const createAjvDto = <T extends TProperties>(
  schema: TObject<T>,
): AjvDto<T> => {
  @PopulateApiProperty(schema)
  class AugmentedDto {
    public static isAjvDto = true;
    public static schema = schema;
  }

  return AugmentedDto as unknown as AjvDto<T>;
};

export function isAjvDto(metatype: any): metatype is AjvDto<{}> {
  return metatype?.isAjvDto;
}

export function PopulateApiProperty<T extends TProperties>(schema: TObject<T>) {
  return function (constructor: Function) {
    for (const key in schema.properties) {
      Reflect.decorate(
        // TODO: has poor required* support
        [ApiProperty(schema.properties[key])],
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
