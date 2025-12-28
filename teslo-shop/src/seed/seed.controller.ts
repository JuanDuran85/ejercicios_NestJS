import { Controller, Get } from '@nestjs/common';
import { AuthUser } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @AuthUser(ValidRoles.admin)
  public executeSeed(): Promise<string> {
    return this.seedService.runSeed();
  }
}
