import * as jwt from 'jsonwebtoken';
import { JwtObjectDto } from '../dto/jwt.dto';
import { UnauthorizedException } from '@nestjs/common';

export abstract class JwtValidate {
  private static readonly jwtSecretKey = process.env.JWT_SECRET;

  static async execute(token: string): Promise<boolean> {
    try {
      const decoded = jwt.verify(token, this.jwtSecretKey) as JwtObjectDto;

      if (decoded) {
        return true;
      }
    } catch (error) {
      throw new UnauthorizedException('Token invalido.');
    }
  }
}
