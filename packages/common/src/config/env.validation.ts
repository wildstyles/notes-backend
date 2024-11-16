import { Static, Type } from '@sinclair/typebox';
import Ajv from 'ajv';

import { StringEnum } from '../validation';

export const nodeEnv = {
  development: 'development',
  production: 'production',
  test: 'test',
} as const;

const schema = Type.Object({
  NODE_ENV: StringEnum(Object.values(nodeEnv)),
  DB_PORT: Type.String(),
  DB_HOST: Type.String(),
  DB_USER: Type.String(),
  DB_NAME: Type.String(),
  DB_PASSWORD: Type.String(),
  USER_SERVICE_URL: Type.String(),
  USER_SERVICE_PORT: Type.String(),
  SUPPLIER_SERVICE_URL: Type.String(),
  SUPPLIER_SERVICE_PORT: Type.String(),
});

export type EnvironmentVariables = Static<typeof schema>;

export function validate(config: Record<string, unknown>) {
  const ajv = new Ajv();

  const isValid = ajv.validate(schema, config);

  if (!isValid) {
    throw new Error(ajv.errorsText());
  }

  return config;
}
