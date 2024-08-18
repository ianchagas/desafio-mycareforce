import { GetUsuariosQueryParamsDto } from '@app/usuarios/dto/user.dto';
import { IUsuarioRepository } from '@app/usuarios/implementation/usuario.interface';
import { UsuariosEntity } from '@app/usuarios/infra/typeorm/entity/usuarios.entity';
import { UsuarioRepository } from '@app/usuarios/infra/typeorm/repository/usuario.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindUsuariosUsecase {
  constructor(
    @Inject(UsuarioRepository)
    private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  async execute(
    payload: GetUsuariosQueryParamsDto,
  ): Promise<{ data: UsuariosEntity[]; count: number }> {
    const findUsuarios = await this.usuarioRepository.find(payload.searchTerm);

    return findUsuarios;
  }
}
