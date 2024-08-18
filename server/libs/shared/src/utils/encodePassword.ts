import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

export abstract class EncodePassword {
  private static readonly saltRounds = 10;
  private static readonly secretKey = process.env.PASSWORD_SECRET;

  static async execute(password: string): Promise<string> {
    const hmac = crypto.createHmac('sha256', this.secretKey);
    const passwordWithKey = hmac.update(password).digest('hex');

    const salt = await bcrypt.genSalt(this.saltRounds);
    const hashedPassword = await bcrypt.hash(passwordWithKey, salt);

    return hashedPassword;
  }
}
