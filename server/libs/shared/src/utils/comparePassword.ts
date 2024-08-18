import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

export abstract class ComparePassword {
  private static readonly secretKey = process.env.PASSWORD_SECRET;

  static async execute(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const hmac = crypto.createHmac('sha256', this.secretKey);
    const passwordWithKey = hmac.update(password).digest('hex');

    return await bcrypt.compare(passwordWithKey, hashedPassword);
  }
}
