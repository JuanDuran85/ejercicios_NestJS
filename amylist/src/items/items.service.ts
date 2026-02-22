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

  public async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  public async findOne(id: string): Promise<Item | null> {
    const itemFound: Item | null = await this.itemRepository.findOneBy({ id });
    if (!itemFound) throw new NotFoundException(`Item with id ${id} not found`);
    return itemFound;
  }

  public async update(
    id: string,
    updateItemInput: UpdateItemInput,
  ): Promise<Item> {
    const itemFound = await this.itemRepository.preload(updateItemInput);

    if (!itemFound) throw new NotFoundException(`Item with id ${id} not found`);

    return this.itemRepository.save(itemFound);
  }

  public async remove(id: string): Promise<Item> {
    const itemFound = (await this.findOne(id)) as Item;
    await this.itemRepository.remove(itemFound);
    return { ...itemFound, id };
  }
}
