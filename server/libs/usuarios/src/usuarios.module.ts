import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosEntity } from './infra/typeorm/entity/usuarios.entity';
import { UsuariosController } from './presentation/usuarios.controller';
import { UsuarioRepository } from './infra/typeorm/repository/usuario.repository';
import { CreateUsuarioUsecase } from './usecase/create/create';
import { FindOneUsuarioUsecase } from './usecase/findOne/findOne';
import { FindUsuariosUsecase } from './usecase/find/find';

@Module({
  providers: [
    UsuarioRepository,
    CreateUsuarioUsecase,
    FindOneUsuarioUsecase,
    FindUsuariosUsecase,
  ],
  controllers: [UsuariosController],
  imports: [TypeOrmModule.forFeature([UsuariosEntity])],
  exports: [],
})
export class UsuariosModule {}
