import { Injectable } from '@nestjs/common';

@Injectable()
export class RewardsService {
  public grantTo(): void {
    console.debug('Message from the lazy-loaded Rewards Service ');
  }
}
