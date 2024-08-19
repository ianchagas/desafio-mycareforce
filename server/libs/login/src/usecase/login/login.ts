import { LoginDto } from '@app/login/dto/login.dto';
import { RedisService } from '@app/redis/redis.service';
import { JwtDto, JwtObjectDto } from '@app/shared/dto/jwt.dto';
import { TypeToken } from '@app/shared/enum/typeToken.enum';
import { ComparePassword } from '@app/shared/utils/comparePassword';
import { JwtCreate } from '@app/shared/utils/jwtCreate';
import { JwtDecode } from '@app/shared/utils/jwtDecode';
import { UsuariosEntity } from '@app/usuarios/infra/typeorm/entity/usuarios.entity';
import { FindByEmailUsecase } from '@app/usuarios/usecase/findByEmail/findByEmail';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

interface IGetUsuarioRedis {
  jwt: JwtDto;
  userData: JwtObjectDto;
}

@Injectable()
export class LoginUsecase {
  constructor(
    private readonly redis: RedisService,
    private readonly findByEmailUsecase: FindByEmailUsecase,
  ) {}

  async execute(payload: LoginDto): Promise<JwtDto> {
    const { email, password, passwordConfirmation } = payload;

    if (password !== passwordConfirmation) {
      throw new BadRequestException(
        'Password é diferente da confirmação. Tente novamente.',
      );
    }

    const loginExistsInRedis: IGetUsuarioRedis = JSON.parse(
      await this.redis.get(email),
    );

    if (loginExistsInRedis) {
      await JwtDecode.execute(
        loginExistsInRedis.jwt.access_token,
        TypeToken.JWT,
      );

      if (loginExistsInRedis.userData.isBanned) {
        throw new UnauthorizedException('Usuario não autorizado.');
      }

      return loginExistsInRedis.jwt;
    }

    const usuario = await this.findByEmailUsecase.execute(email);

    if (!usuario) {
      throw new BadRequestException(
        'Email ou password incorretos. Tente novamente.',
      );
    }

    const comparePassword = await ComparePassword.execute(
      password,
      usuario.password,
    );

    if (!comparePassword) {
      throw new BadRequestException(
        'Email ou password incorretos. Tente novamente.',
      );
    }

    if (usuario.isBanned) {
      throw new UnauthorizedException('Usuario não autorizado.');
    }

    const createJwt: JwtObjectDto = {
      uuid: usuario.uuid,
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      email: usuario.email,
      role: usuario.role,
      isBanned: usuario.isBanned,
    };

    const jwt = await JwtCreate.execute(createJwt);

    const redisData = {
      jwt,
      userData: createJwt,
    };

    await this.redis.set(usuario.email, JSON.stringify(redisData), 300);

    return jwt;
  }
}
