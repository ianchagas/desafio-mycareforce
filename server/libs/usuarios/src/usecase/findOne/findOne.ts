import { IUsuarioRepository } from '@app/usuarios/implementation/usuario.interface';
import { UsuariosEntity } from '@app/usuarios/infra/typeorm/entity/usuarios.entity';
import { UsuarioRepository } from '@app/usuarios/infra/typeorm/repository/usuario.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindOneUsuarioUsecase {
  constructor(
    @Inject(UsuarioRepository)
    private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  async execute(uuid: string): Promise<UsuariosEntity> {
    const usuario = await this.usuarioRepository.findOne(uuid);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }
}
