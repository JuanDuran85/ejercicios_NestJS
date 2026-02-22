import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateItemInput, UpdateItemInput } from './dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  public async create(
    createItemInput: CreateItemInput,
    user: User,
  ): Promise<Item> {
    const newItem: Item = this.itemRepository.create({
      ...createItemInput,
      user,
    });
    return await this.itemRepository.save(newItem);
  }

  public async findAll(user: User): Promise<Item[]> {
    return this.itemRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: {
        user: true,
      },
    });
  }

  public async findOne(id: string, user: User): Promise<Item | null> {
    const itemFound: Item | null = await this.itemRepository.findOneBy({
      id,
      user: {
        id: user.id,
      },
    });
    if (!itemFound) throw new NotFoundException(`Item with id ${id} not found`);
    return itemFound;
  }

  public async update(
    id: string,
    updateItemInput: UpdateItemInput,
    user: User
  ): Promise<Item> {

    await this.findOne(id, user);
    const itemFound: Item | undefined =
      await this.itemRepository.preload(updateItemInput);

    if (!itemFound) throw new NotFoundException(`Item with id ${id} not found`);
    return this.itemRepository.save(itemFound);
  }

  public async remove(id: string, user: User): Promise<Item> {
    const itemFound = (await this.findOne(id, user)) as Item;
    await this.itemRepository.delete({ id, user });
    return { ...itemFound, id };
  }
}
