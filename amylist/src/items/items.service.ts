import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ItemsService {


  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>
  ) { }

  public async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem: Item = this.itemRepository.create(createItemInput);
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

  public update(id: number, updateItemInput: UpdateItemInput) {
    return `This action updates a #${id} item`;
  }

  public remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
