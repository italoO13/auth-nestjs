import * as bcrypt from 'bcrypt';

export class Encrypt {
  readonly SALT = 10;

  async encryptPassword(password: string): Promise<string> {
    const generateSalt = await bcrypt.genSalt(this.SALT);
    return bcrypt.hash(password, generateSalt);
  }

  async comparePassword(
    password: string,
    encryptPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, encryptPassword);
  }
}
