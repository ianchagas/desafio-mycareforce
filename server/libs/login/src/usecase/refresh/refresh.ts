import { RedisService } from '@app/redis/redis.service';
import { JwtDto, JwtObjectDto } from '@app/shared/dto/jwt.dto';
import { TypeToken } from '@app/shared/enum/typeToken.enum';
import { JwtCreate } from '@app/shared/utils/jwtCreate';
import { JwtDecode } from '@app/shared/utils/jwtDecode';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RefreshUsecase {
  constructor(private readonly redis: RedisService) {}
  async execute(payload: { refresh_token: string }): Promise<JwtDto> {
    const decode = await JwtDecode.execute(
      payload.refresh_token,
      TypeToken.REFRESH,
    );

    if (decode.data.isBanned) {
      throw new UnauthorizedException('Usuario não autorizado.');
    }

    const createJwt: JwtObjectDto = {
      uuid: decode.data.uuid,
      nome: decode.data.nome,
      sobrenome: decode.data.sobrenome,
      email: decode.data.email,
      role: decode.data.role,
      isBanned: decode.data.isBanned,
    };

    const jwt = await JwtCreate.execute(createJwt);

    const redisData = {
      jwt,
      userData: createJwt,
    };

    await this.redis.set(decode.data.email, JSON.stringify(redisData), 300);

    return jwt;
  }
}
