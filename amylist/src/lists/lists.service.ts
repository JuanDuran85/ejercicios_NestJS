import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationArgs, SearchArgs } from '../common';
import { User } from '../users/entities/user.entity';
import { CreateListInput, UpdateListInput } from './dto';
import { List } from './entities';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private readonly listsRepository: Repository<List>,
  ) {}

  public async create(
    createListInput: CreateListInput,
    user: User,
  ): Promise<List> {
    const newList: List = this.listsRepository.create({
      ...createListInput,
      user,
    });
    return await this.listsRepository.save(newList);
  }

  public async findAll(
    user: User,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<List[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    const queryBuilder: SelectQueryBuilder<List> = this.listsRepository
      .createQueryBuilder('item')
      .where(`"userId" = :userId`, { userId: user.id })
      .take(limit)
      .skip(offset);

    if (search)
      queryBuilder.andWhere(
        String(search) ? `item.name ILIKE '%${search}%'` : '',
      );

    return queryBuilder.getMany();
  }

  public async findOne(id: string, user: User): Promise<List | null> {
    const listFound: List | null = await this.listsRepository.findOneBy({
      id,
      user: {
        id: user.id,
      },
    });
    if (!listFound) throw new NotFoundException(`List with id ${id} not found`);
    return listFound;
  }

  public async update(
    id: string,
    updateListInput: UpdateListInput,
    user: User,
  ): Promise<List> {
    await this.findOne(id, user);
    const listFound: List | undefined = await this.listsRepository.preload({
      ...updateListInput,
      user,
    });

    if (!listFound) throw new NotFoundException(`List with id ${id} not found`);
    return this.listsRepository.save(listFound);
  }

  public async remove(id: string, user: User): Promise<List> {
    const listFound: List = (await this.findOne(id, user)) as List;
    await this.listsRepository.delete({ id, user });
    return { ...listFound, id };
  }
}
