import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../items/entities/item.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SEED_ITEMS, SEED_USERS } from './data/seed-data';
import { ItemsService } from 'src/items/items.service';

@Injectable()
export class SeedService {
  private readonly isProd: boolean;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,
  ) {
    this.isProd = configService.get('ENV') === 'prod';
  }

  public async executeSeed(): Promise<boolean> {
    if (this.isProd)
      throw new UnauthorizedException('Cannot run seed in production');

    await this.deleteDatabase();

    const users: User[] = await this.loadUsers();
    console.debug({ users });

    const item: Item = await this.loadItems(users[0]);
    console.debug({ item });

    return true;
  }

  private async deleteDatabase() {
    await this.itemRepository.createQueryBuilder().delete().where({}).execute();
    await this.userRepository.createQueryBuilder().delete().where({}).execute();
  }

  private async loadUsers(): Promise<User[]> {
    const users: User[] = [];
    const userFromSeed = SEED_USERS as unknown as User[];

    for (const userToCreate of userFromSeed) {
      users.push(await this.usersService.create(userToCreate));
    }

    return users;
  }

  private async loadItems(user: User): Promise<Item> {
    const itemFromSeed = SEED_ITEMS as unknown as Item[];

    const items: Item[] = await this.itemsService.createMany(
      itemFromSeed,
      user,
    );
    return items[0];
  }
}
