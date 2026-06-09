import { Injectable } from '@nestjs/common';
import { BcryptJsAdapter } from '../../common/adapters';
import { HashingService } from './hashing.service';

@Injectable()
export class BcryptjsService implements HashingService {
  constructor(private readonly bcryptJsAdapter: BcryptJsAdapter) {}

  public hash(data: string): string {
    return this.bcryptJsAdapter.hash(data);
  }
  public compare(data: string, encrypted: string): boolean {
    return this.bcryptJsAdapter.compare(data, encrypted);
  }
}
