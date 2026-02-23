import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../items/entities/item.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SeedService {
  private readonly isProd: boolean;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.isProd = configService.get('ENV') === 'prod';
  }

  public async executeSeed(): Promise<boolean> {
    if (this.isProd)
      throw new UnauthorizedException('Cannot run seed in production');

    await this.deleteDatabase();

    //2. Create users
    //3. Create items

    return true;
  }

  private async deleteDatabase() {
    await this.itemRepository.createQueryBuilder().delete().where({}).execute();
    await this.userRepository.createQueryBuilder().delete().where({}).execute();
  }
}
