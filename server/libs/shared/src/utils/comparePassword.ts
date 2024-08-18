import * as bcrypt from 'bcryptjs';

export abstract class ComparePassword {
  static async execute(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
