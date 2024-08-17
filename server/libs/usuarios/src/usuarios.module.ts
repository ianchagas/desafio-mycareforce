import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosEntity } from './infra/typeorm/entity/usuarios.entity';
import { UsuariosController } from './presentation/usuarios.controller';
import { UsuarioRepository } from './infra/typeorm/repository/usuario.repository';
import { CreateUsuarioUsecase } from './usecase/create/create';

@Module({
  providers: [UsuarioRepository, CreateUsuarioUsecase],
  controllers: [UsuariosController],
  imports: [TypeOrmModule.forFeature([UsuariosEntity])],
  exports: [],
})
export class UsuariosModule {}
