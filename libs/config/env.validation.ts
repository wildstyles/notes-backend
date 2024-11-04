import { Type, Static } from '@sinclair/typebox';
import Ajv from 'ajv';

const schema = Type.Object({
  DB_PORT: Type.String(),
  DB_HOST: Type.String(),
  DB_USER: Type.String(),
  DB_NAME: Type.String(),
  DB_PASSWORD: Type.String(),
});

export interface EnvironmentVariables extends Static<typeof schema> {}

export function validate(config: Record<string, unknown>) {
  const ajv = new Ajv();

  const isValid = ajv.validate(schema, config);

  if (!isValid) {
    throw new Error(ajv.errorsText());
  }

  return config;
}
