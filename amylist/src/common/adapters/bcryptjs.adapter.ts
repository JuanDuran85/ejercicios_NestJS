import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

@Injectable()
export class BcryptJsAdapter {
  private readonly bcryptjs: typeof bcrypt = bcrypt;
  private readonly saltRounds: number = 10;

  public hash(password: string): string {
    return this.bcryptjs.hashSync(password, this.saltRounds);
  }

  public check(password: string, hashedPassword: string): boolean {
    return this.bcryptjs.compareSync(password, hashedPassword);
  }
}
