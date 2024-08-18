import { RedisService } from '@app/redis/redis.service';
import { IUsuarioRepository } from '@app/usuarios/implementation/usuario.interface';
import { UsuarioRepository } from '@app/usuarios/infra/typeorm/repository/usuario.repository';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class BanUsuarioUsecase {
  constructor(
    @Inject(UsuarioRepository)
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly redis: RedisService,
  ) {}

  async execute(uuid: string): Promise<void> {
    const usuarioExists = await this.usuarioRepository.findOne(uuid);

    if (!usuarioExists) {
      throw new BadRequestException(
        'Usuário já encontra-se banido ou excluído.',
      );
    }

    await this.usuarioRepository.ban(uuid);

    await this.redis.updateBannedStatus(usuarioExists.email, true);
  }
}
