import { TypeToken } from '@app/shared/enum/typeToken.enum';
import { JwtDecode } from '@app/shared/utils/jwtDecode';
import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';

export const Usuario = createParamDecorator(
  async (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const bearerToken: string = request.headers.authorization;

    let token: string;

    if (bearerToken && bearerToken.startsWith('Bearer ')) {
      token = bearerToken.substring(7);
    } else if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
      throw new UnauthorizedException('Usuário não autenticado.');
    } else {
      throw new HttpException('Erro na autenticação', 401, {
        cause: 'Falha na autenticação: tipo de autenticação incorreto.',
      });
    }

    return await JwtDecode.execute(token, TypeToken.JWT);
  },
);
