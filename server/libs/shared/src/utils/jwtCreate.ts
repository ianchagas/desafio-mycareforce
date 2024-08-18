import { JwtDto, JwtObjectDto } from '../dto/jwt.dto';
import * as jwt from 'jsonwebtoken';

export abstract class JwtCreate {
  private static readonly jwtSecretKey = process.env.JWT_SECRET;
  private static readonly refreshSecretKey = process.env.JWT_REFRESH_SECRET;

  static async execute(data: JwtObjectDto): Promise<JwtDto> {
    const today = new Date();
    const expiresInSeconds = 24 * 60 * 60;
    const exp = Math.floor(today.getTime() / 1000) + expiresInSeconds;

    const generateJwt = jwt.sign(
      {
        data,
      },
      this.jwtSecretKey,
      {
        expiresIn: '1d',
      },
    );

    const refreshToken = jwt.sign(
      {
        data,
      },
      this.refreshSecretKey,
      {
        expiresIn: '2d',
      },
    );

    return {
      access_token: generateJwt,
      refresh_token: refreshToken,
      expires_in: exp,
    };
  }
}
