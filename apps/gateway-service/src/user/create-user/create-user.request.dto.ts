import { Type } from '@sinclair/typebox';
import { CreateUserRequest } from '@app/libs';
import { createAjvDto } from '@app/libs/validation';

// export interface CreateUserRequest {
//   name: string;
//   email: string;
//   password: string;
//   age: number;
// }

const CreateUserRequestSchema = Type.Object({
  name: Type.String({ description: 'User name' }),
  email: Type.String(),
  password: Type.String(),
  age: Type.Number(),
});

export class CreateUserRequestDto extends createAjvDto(
  CreateUserRequestSchema,
) {}
