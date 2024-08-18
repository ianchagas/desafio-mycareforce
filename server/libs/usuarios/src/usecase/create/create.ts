import { UserRole } from '@app/shared/enum/userRole.enum';
import { EncodePassword } from '@app/shared/utils/encodePassword';
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

    const hashPassword = await EncodePassword.execute(payload.password);

    payload.password = hashPassword;

    if (payload.role === UserRole.ADMIN) {
      throw new BadRequestException(
        'Não é possível criar uma conta com esse tipo de permissão.',
      );
    }

    return await this.usuarioRepository.create(payload);
  }
}
