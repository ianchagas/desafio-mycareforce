import { CreateUsuarioDto } from '@app/usuarios/dto/user.dto';
import { IUsuarioRepository } from '@app/usuarios/implementation/usuario.interface';
import { UsuarioRepository } from '@app/usuarios/infra/typeorm/repository/usuario.repository';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateUsuarioUsecase {
  constructor(
    @Inject(UsuarioRepository)
    private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  async execute(payload: CreateUsuarioDto): Promise<any> {
    const verifyEmail = await this.usuarioRepository.findByEmail(payload.email);

    if (verifyEmail) {
      throw new BadRequestException('Email já consta cadastrado.');
    }

    return await this.usuarioRepository.create(payload);
  }
}
