import { IUsuarioRepository } from '@app/usuarios/implementation/usuario.interface';
import { UsuariosEntity } from '@app/usuarios/infra/typeorm/entity/usuarios.entity';
import { UsuarioRepository } from '@app/usuarios/infra/typeorm/repository/usuario.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindByEmailPasswordUsecase {
  constructor(
    @Inject(UsuarioRepository)
    private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  async execute(email: string, password: string): Promise<UsuariosEntity> {
    return await this.usuarioRepository.findByEmailPassword(email, password);
  }
}
