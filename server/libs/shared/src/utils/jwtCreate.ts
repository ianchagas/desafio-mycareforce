import { JwtDto, JwtObjectDto } from '../dto/jwt.dto';
import * as jwt from 'jsonwebtoken';

export abstract class JwtCreate {
  private static readonly jwtSecretKey = process.env.JWT_SECRET;
  private static readonly refreshSecretKey = process.env.JWT_REFRESH_SECRET;

  static async execute(data: JwtObjectDto): Promise<JwtDto> {
    const accessTokenExpiresIn = Math.floor(Date.now() / 1000) + 5 * 60;

    const generateJwt = jwt.sign(
      {
        data,
        expires_in: accessTokenExpiresIn,
      },
      this.jwtSecretKey,
      {
        expiresIn: '5m',
      },
    );

    const refreshToken = jwt.sign(
      {
        data,
      },
      this.refreshSecretKey,
      {
        expiresIn: '10m',
      },
    );

    return {
      access_token: generateJwt,
      refresh_token: refreshToken,
      expires_in: accessTokenExpiresIn,
    };
  }
}
