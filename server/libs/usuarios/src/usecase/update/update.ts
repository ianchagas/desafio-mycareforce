import { UserRole } from '@app/shared/enum/userRole.enum';
import { ComparePassword } from '@app/shared/utils/comparePassword';
import { EncodePassword } from '@app/shared/utils/encodePassword';
import { UpdateUsuarioDto } from '@app/usuarios/dto/user.dto';
import { IUsuarioRepository } from '@app/usuarios/implementation/usuario.interface';
import { UsuarioRepository } from '@app/usuarios/infra/typeorm/repository/usuario.repository';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

interface IUpdate {
  uuid: string;
  payload: UpdateUsuarioDto;
}
@Injectable()
export class UpdateUsuarioUsecase {
  constructor(
    @Inject(UsuarioRepository)
    private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  async execute({ uuid, payload }: IUpdate): Promise<any> {
    const usuario = await this.usuarioRepository.findOne(uuid);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (payload.password) {
      const comparePassword = await ComparePassword.execute(
        payload.password,
        usuario.password,
      );

      if (comparePassword) {
        throw new BadRequestException('Senha não pode ser igual a anterior.');
      }

      const hashPassword = await EncodePassword.execute(payload.password);

      payload.password = hashPassword;
    }

    if (payload.email && payload.email !== usuario.email) {
      const verifyEmail = await this.usuarioRepository.findByEmail(
        payload.email,
      );

      if (verifyEmail) {
        throw new BadRequestException(
          'Email já consta cadastrado. Não é possível alterar',
        );
      }
    }

    if (payload.role === UserRole.ADMIN) {
      throw new BadRequestException(
        'Não é possível alterar uma conta para esse tipo de permissão.',
      );
    }

    await this.usuarioRepository.update(uuid, payload);
  }
}
