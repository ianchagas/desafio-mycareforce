import { IUsuarioRepository } from '@app/usuarios/implementation/usuario.interface';
import { UsuariosEntity } from '@app/usuarios/infra/typeorm/entity/usuarios.entity';
import { UsuarioRepository } from '@app/usuarios/infra/typeorm/repository/usuario.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindByEmailUsecase {
  constructor(
    @Inject(UsuarioRepository)
    private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  async execute(email: string): Promise<UsuariosEntity> {
    return await this.usuarioRepository.findByEmail(email);
  }
}
