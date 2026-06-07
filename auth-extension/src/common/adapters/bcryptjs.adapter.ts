import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { HastService } from './interfaces';

@Injectable()
export class BcryptJsAdapter implements HastService {
  private readonly bcryptjs: typeof bcrypt = bcrypt;
  private readonly saltRounds: number = 10;

  public hash(data: string): string {
    return this.bcryptjs.hashSync(data, this.saltRounds);
  }

  public compare(data: string, encrypted: string): boolean {
    return this.bcryptjs.compareSync(data, encrypted);
  }
}
