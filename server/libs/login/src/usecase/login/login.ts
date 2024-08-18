import { LoginDto } from '@app/login/dto/login.dto';
import { RedisService } from '@app/redis/redis.service';
import { JwtDto, JwtObjectDto } from '@app/shared/dto/jwt.dto';
import { ComparePassword } from '@app/shared/utils/comparePassword';
import { EncodePassword } from '@app/shared/utils/encodePassword';
import { JwtCreate } from '@app/shared/utils/jwtCreate';
import { FindByEmailUsecase } from '@app/usuarios/usecase/findByEmail/findByEmail';
import { FindByEmailPasswordUsecase } from '@app/usuarios/usecase/findByEmailPassword/findByEmailPassword';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class LoginUsecase {
  constructor(
    // private readonly redis: RedisService,
    private readonly findByEmailUsecase: FindByEmailUsecase,
  ) {}

  async execute(payload: LoginDto): Promise<JwtDto> {
    const { email, password, passwordConfirmation } = payload;

    if (password !== passwordConfirmation) {
      throw new BadRequestException(
        'Password é diferente da confirmação. Tente novamente.',
      );
    }

    const usuario = await this.findByEmailUsecase.execute(email);

    const comparePassword = await ComparePassword.execute(
      password,
      usuario.password,
    );

    if (!comparePassword) {
      throw new BadRequestException(
        'Email ou password incorretos. Teste novamente.',
      );
    }

    const createJwt: JwtObjectDto = {
      data: {
        uuid: usuario.uuid,
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        email: usuario.email,
        isBanned: usuario.isBanned,
      },
    };

    const jwt = await JwtCreate.execute(createJwt);

    return jwt;
  }
}
