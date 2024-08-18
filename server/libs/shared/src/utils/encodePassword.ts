import * as bcrypt from 'bcryptjs';

export abstract class EncodePassword {
  private static readonly saltRounds = 10;

  static async execute(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }
}
