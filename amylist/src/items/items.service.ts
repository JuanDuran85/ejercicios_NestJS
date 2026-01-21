import { Injectable } from '@nestjs/common';
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

  public findAll() {
    return `This action returns all items`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  public update(id: number, updateItemInput: UpdateItemInput) {
    return `This action updates a #${id} item`;
  }

  public remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
