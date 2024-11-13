import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

import Ajv from 'ajv';

import { isAjvDto } from './create-ajv-dto';

export class AjvValidationPipe implements PipeTransform {
  private ajv: Ajv;

  constructor(ajv?: Ajv) {
    if (!ajv) {
      ajv = new Ajv();
    }

    this.ajv = ajv;
  }

  transform<T>(input: T, metadata: ArgumentMetadata): T {
    if (!isAjvDto(metadata.metatype)) {
      return input;
    }

    const isValid = this.ajv.validate(metadata.metatype.schema, input);

    if (!isValid) {
      throw new BadRequestException(this.ajv.errors);
    }

    return input;
  }
}
