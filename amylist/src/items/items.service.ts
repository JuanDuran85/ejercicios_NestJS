import { Injectable } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';

@Injectable()
export class ItemsService {
  public create(createItemInput: CreateItemInput) {
    return 'This action adds a new item';
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
