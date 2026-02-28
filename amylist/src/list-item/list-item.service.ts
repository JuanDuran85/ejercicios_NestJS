import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationArgs, SearchArgs } from '../common';
import { List } from '../lists';
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

  public async findAll(
    list: List,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<ListItem[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    const queryBuilder: SelectQueryBuilder<ListItem> = this.listItemRepository
      .createQueryBuilder('list_item')
      .where(`"listId" = :listId`, { listId: list.id })
      .take(limit)
      .skip(offset);

    if (search)
      queryBuilder.andWhere(
        String(search) ? `list_item.name ILIKE '%${search}%'` : '',
      );

    return queryBuilder.getMany();
  }

  public async findOne(id: string): Promise<ListItem> {
    const listItemFound: ListItem | null =
      await this.listItemRepository.findOneBy({ id });
      console.debug(listItemFound);
    if (!listItemFound)
      throw new NotFoundException(`List item with id: ${id} not found`);
    return listItemFound;
  }

  public async update(id: string, updateListItemInput: UpdateListItemInput) {
    return `This action updates a #${id} listItem`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} listItem`;
  }

  public async itemsCountByList(list: List): Promise<number> {
    return this.listItemRepository.count({
      where: {
        list: {
          id: list.id,
        },
      },
    });
  }
}
