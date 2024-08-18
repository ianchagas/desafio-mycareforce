import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosEntity } from './infra/typeorm/entity/usuarios.entity';
import { UsuariosController } from './presentation/usuarios.controller';
import { UsuarioRepository } from './infra/typeorm/repository/usuario.repository';
import { CreateUsuarioUsecase } from './usecase/create/create';
import { FindOneUsuarioUsecase } from './usecase/findOne/findOne';
import { FindUsuariosUsecase } from './usecase/find/find';
import { DeleteUsuarioUsecase } from './usecase/delete/delete';

@Module({
  providers: [
    UsuarioRepository,
    CreateUsuarioUsecase,
    FindOneUsuarioUsecase,
    FindUsuariosUsecase,
    DeleteUsuarioUsecase,
  ],
  controllers: [UsuariosController],
  imports: [TypeOrmModule.forFeature([UsuariosEntity])],
  exports: [],
})
export class UsuariosModule {}
