import {
  HttpException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtDecode } from '../utils/jwtDecode';
import { TypeToken } from '../enum/typeToken.enum';
import { RedisService } from '@app/redis/redis.service';
import { UserRole } from '../enum/userRole.enum';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private readonly redis: RedisService) {}
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const bearerToken: string = req.headers.authorization;

    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
      throw new UnauthorizedException('Usuário não autenticado.');
    }

    const token = bearerToken.substring(7);

    const { data } = await JwtDecode.execute(token, TypeToken.JWT);

    const redisData = JSON.parse(await this.redis.get(data.email));

    if (!redisData) {
      throw new UnauthorizedException('Usuário não autenticado.');
    }

    const usuarios = redisData;

    if (usuarios.userData.isBanned) {
      throw new UnauthorizedException('Usuário banido ou não autenticado.');
    }

    if (usuarios.userData.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        'Nível de permissão inválido para a funcionalidade.',
      );
    }

    next();
  }
}
