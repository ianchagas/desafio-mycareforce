import * as jwt from 'jsonwebtoken';
import { JwtDecodeDto, JwtObjectDto } from '../dto/jwt.dto';
import { UnauthorizedException } from '@nestjs/common';
import { TypeToken } from '../enum/typeToken.enum';

export abstract class JwtDecode {
  private static readonly jwtSecretKey = process.env.JWT_SECRET;
  private static readonly refreshSecretKey = process.env.JWT_REFRESH_SECRET;

  static async execute(token: string, type: TypeToken): Promise<JwtDecodeDto> {
    try {
      if (type === TypeToken.JWT) {
        return jwt.verify(token, this.jwtSecretKey) as JwtDecodeDto;
      }

      if (type === TypeToken.REFRESH) {
        return jwt.verify(token, this.refreshSecretKey) as JwtDecodeDto;
      }
    } catch (error) {
      throw new UnauthorizedException('Token invalido ou expirado.');
    }
  }
}
