import { BadRequestException, ParseUUIDPipeOptions } from '@nestjs/common';

export const uuidOptions = {
  version: '4',
  exceptionFactory: () => {
    return new BadRequestException(
      'Você precisa passar um UUID no formato válido (uuidv4).',
    );
  },
} as ParseUUIDPipeOptions;
