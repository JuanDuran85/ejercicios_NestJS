import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {
  private readonly isProd: boolean;

  constructor(private readonly configService: ConfigService) {
    this.isProd = configService.get('ENV') === 'prod';
  }

  public async executeSeed(): Promise<boolean> {
    if (this.isProd)
      throw new UnauthorizedException('Cannot run seed in production');
    //1. Clean all the DB registers
    //2. Create users
    //3. Create items

    return true;
  }
}
