import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../items/entities/item.entity';
import { ItemsService } from '../items/items.service';
import { ListItem } from '../list-item/entities/list-item.entity';
import { ListItemService } from '../list-item/list-item.service';
import { List, ListsService } from '../lists';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SEED_ITEMS, SEED_LIST, SEED_USERS } from './data/seed-data';

@Injectable()
export class SeedService {
  private readonly isProd: boolean;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>,
    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,
    private readonly listsService: ListsService,
    private readonly listItemService: ListItemService,
  ) {
    this.isProd = configService.get('ENV') === 'prod';
  }

  public async executeSeed(): Promise<boolean> {
    if (this.isProd)
      throw new UnauthorizedException('Cannot run seed in production');

    await this.deleteDatabase();

    const users: User[] = await this.loadUsers();
    console.debug({ users });

    const item: Item[] = await this.loadItems(users[0]);
    console.debug({ item });

    const lists: List[] = await this.loadList(users[0]);
    console.debug({ lists });

    const randomIntegerNumber: number = Math.floor(Math.random() * 33);

    const itemToAddToList: Item[] = item.slice(0, randomIntegerNumber);

    for (let index = 0; index < 3; index++) {
      const listItem: ListItem[] = await this.loadListItems(
        lists[index],
        itemToAddToList,
        users[index],
      );
      console.debug({ listItem });
    }

    return true;
  }

  private async deleteDatabase() {
    await this.listItemRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
    await this.listRepository.createQueryBuilder().delete().where({}).execute();
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

  private async loadItems(user: User): Promise<Item[]> {
    const itemFromSeed = SEED_ITEMS as unknown as Item[];

    const items: Item[] = await this.itemsService.createMany(
      itemFromSeed,
      user,
    );
    return items;
  }

  private async loadList(user: User): Promise<List[]> {
    const listFromSeed = SEED_LIST as unknown as List[];
    const listsCreated: List[] = [];

    for (const listToCreate of listFromSeed) {
      listsCreated.push(await this.listsService.create(listToCreate, user));
    }

    return listsCreated;
  }

  private async loadListItems(
    list: List,
    items: Item[],
    users: User,
  ): Promise<ListItem[]> {
    const listItems: ListItem[] = [];

    for (const item of items) {
      listItems.push(
        await this.listItemService.create({
          quantity: Math.round(Math.random() * 99),
          completed: Math.round(Math.random() * 1) !== 0,
          listId: list.id,
          itemId: item.id,
        }),
      );
    }

    return listItems;
  }
}
