import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosEntity } from './infra/typeorm/entity/usuarios.entity';
import { UsuariosController } from './presentation/usuarios.controller';
import { UsuarioRepository } from './infra/typeorm/repository/usuario.repository';
import { CreateUsuarioUsecase } from './usecase/create/create';
import { FindOneUsuarioUsecase } from './usecase/findOne/findOne';
import { FindUsuariosUsecase } from './usecase/find/find';
import { DeleteUsuarioUsecase } from './usecase/delete/delete';
import { BanUsuarioUsecase } from './usecase/ban/ban';
import { UpdateUsuarioUsecase } from './usecase/update/update';
import { FindByEmailPasswordUsecase } from './usecase/findByEmailPassword/findByEmailPassword';
import { ConfigModule } from '@nestjs/config';
import { FindByEmailUsecase } from './usecase/findByEmail/findByEmail';

const UsuariosProviders = [
  UsuarioRepository,
  CreateUsuarioUsecase,
  FindOneUsuarioUsecase,
  FindUsuariosUsecase,
  DeleteUsuarioUsecase,
  BanUsuarioUsecase,
  UpdateUsuarioUsecase,
  FindByEmailPasswordUsecase,
  FindByEmailUsecase,
];
@Module({
  imports: [TypeOrmModule.forFeature([UsuariosEntity])],
  providers: [...UsuariosProviders],
  controllers: [UsuariosController],
  exports: [...UsuariosProviders],
})
export class UsuariosModule {}
