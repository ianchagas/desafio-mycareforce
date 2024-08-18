import { IsNotBlank } from '@app/shared/decorators/class-validator/IsNotBlank.decorator';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty({
    message: 'Campo "email" é obrigatório.',
  })
  @IsNotBlank('email', {
    message: 'Campo "email" não pode ser vazio.',
  })
  email: string;

  @IsNotEmpty({
    message: 'Campo "password" é obrigatório.',
  })
  @IsNotBlank('password', {
    message: 'Campo "password" não pode ser vazio.',
  })
  password: string;

  @IsNotEmpty({
    message: 'Campo "passwordConfirmation" é obrigatório.',
  })
  @IsNotBlank('password', {
    message: 'Campo "passwordConfirmation" não pode ser vazio.',
  })
  passwordConfirmation: string;
}
