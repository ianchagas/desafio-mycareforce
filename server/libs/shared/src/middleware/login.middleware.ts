import {
  HttpException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtDecode } from '../utils/jwtDecode';
import { TypeToken } from '../enum/typeToken.enum';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const bearerToken: string = req.headers.authorization;

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

    await JwtDecode.execute(token, TypeToken.JWT);

    return next();
  }
}
