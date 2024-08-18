import { IUsuarioRepository } from '@app/usuarios/implementation/usuario.interface';
import { UsuarioRepository } from '@app/usuarios/infra/typeorm/repository/usuario.repository';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUsuarioUsecase {
  constructor(
    @Inject(UsuarioRepository)
    private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  async execute(uuid: string): Promise<void> {
    const usuarioExists = await this.usuarioRepository.findOne(uuid);

    if (!usuarioExists) {
      throw new BadRequestException(
        'Usuário já encontra-se banido ou excluído.',
      );
    }

    return await this.usuarioRepository.delete(usuarioExists);
  }
}
