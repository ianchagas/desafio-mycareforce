import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from '../enum/userRole.enum';
import { IsNotBlank } from '@app/shared/decorators/class-validator/IsNotBlank.decorator';

export class CreateUsuarioDto {
  @IsNotEmpty({
    message: 'Campo "nome" é obrigatório.',
  })
  @IsNotBlank('nome', {
    message: 'Campo "nome" não pode ser vazio.',
  })
  nome: string;

  @IsNotEmpty({
    message: 'Campo "sobrenome" é obrigatório.',
  })
  @IsNotBlank('sobrenome', {
    message: 'Campo "sobrenome" não pode ser vazio.',
  })
  sobrenome: string;

  @IsEmail()
  @IsNotEmpty({
    message: 'Campo "email" é obrigatório.',
  })
  @IsNotBlank('email', {
    message: 'Campo "email" não pode ser vazio.',
  })
  email: string;

  @IsNotEmpty({
    message: 'Campo role é obrigatório.',
  })
  @IsNotBlank('role', {
    message: 'Campo "role" não pode ser vazio.',
  })
  @IsEnum(UserRole, {
    message:
      'As permissões válidas "user roles" são (PROFISSIONAL, GESTAO E ADMIN).',
  })
  role: UserRole;

  @IsNotEmpty({
    message: 'Campo "password" é obrigatório.',
  })
  @IsNotBlank('password', {
    message: 'Campo "password" não pode ser vazio.',
  })
  password: string;
}

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  sobrenome: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(UserRole, {
    message:
      'As permissões válidas "user roles" são (PROFISSIONAL, GESTAO E ADMIN).',
  })
  role: UserRole;

  @IsOptional()
  @IsString()
  password: string;
}

export class GetUsuariosQueryParamsDto {
  @IsOptional()
  @IsString()
  searchTerm?: string;
}
