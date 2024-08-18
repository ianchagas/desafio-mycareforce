import { JwtDto, JwtObjectDto } from '@app/shared/dto/jwt.dto';
import { TypeToken } from '@app/shared/enum/typeToken.enum';
import { JwtCreate } from '@app/shared/utils/jwtCreate';
import { JwtDecode } from '@app/shared/utils/jwtDecode';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshUsecase {
  async execute(payload: { refresh_token: string }): Promise<JwtDto> {
    const decode = await JwtDecode.execute(
      payload.refresh_token,
      TypeToken.REFRESH,
    );

    const createJwt: JwtObjectDto = {
      uuid: decode.data.uuid,
      nome: decode.data.nome,
      sobrenome: decode.data.sobrenome,
      email: decode.data.email,
      isBanned: decode.data.isBanned,
    };

    return await JwtCreate.execute(createJwt);
  }
}
