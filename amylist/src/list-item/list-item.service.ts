import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListItemInput } from './dto/create-list-item.input';
import { UpdateListItemInput } from './dto/update-list-item.input';
import { ListItem } from './entities/list-item.entity';

@Injectable()
export class ListItemService {
  constructor(
    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>,
  ) {}

  public async create(
    createListItemInput: CreateListItemInput,
  ): Promise<ListItem> {
    const { itemId, listId, ...rest } = createListItemInput;
    const newListItem = this.listItemRepository.create({
      ...rest,
      item: { id: itemId },
      list: { id: listId },
    });
    return this.listItemRepository.save(newListItem);
  }

  public async findAll(): Promise<ListItem[]> {
    return this.listItemRepository.find();
  }

  public async findOne(id: number) {
    return `This action returns a #${id} listItem`;
  }

  public async update(id: string, updateListItemInput: UpdateListItemInput) {
    return `This action updates a #${id} listItem`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} listItem`;
  }
}
