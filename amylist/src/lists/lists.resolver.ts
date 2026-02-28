import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser, JwtAuthGuard } from '../auth';
import { PaginationArgs, SearchArgs } from '../common';
import { ListItem } from '../list-item/entities/list-item.entity';
import { ListItemService } from '../list-item/list-item.service';
import { User } from '../users';
import { CreateListInput, UpdateListInput } from './dto';
import { List } from './entities/list.entity';
import { ListsService } from './lists.service';

@Resolver(() => List)
@UseGuards(JwtAuthGuard)
export class ListsResolver {
  constructor(
    private readonly listsService: ListsService,
    private readonly listItemService: ListItemService,
  ) {}

  @Mutation(() => List)
  public async createList(
    @Args('createListInput') createListInput: CreateListInput,
    @CurrentUser() user: User,
  ): Promise<List> {
    return this.listsService.create(createListInput, user);
  }

  @Query(() => [List], { name: 'lists' })
  public async findAll(
    @CurrentUser() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<List[]> {
    return this.listsService.findAll(user, paginationArgs, searchArgs);
  }

  @Query(() => List, { name: 'list' })
  public async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<List | null> {
    return this.listsService.findOne(id, user);
  }

  @Mutation(() => List)
  public async updateList(
    @Args('updateListInput') updateListInput: UpdateListInput,
    @CurrentUser() user: User,
  ): Promise<List> {
    return this.listsService.update(updateListInput.id, updateListInput, user);
  }

  @Mutation(() => List)
  public async removeList(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<List> {
    return this.listsService.remove(id, user);
  }

  @ResolveField(() => [ListItem], {
    name: 'items',
    nullable: true,
    defaultValue: [],
    description: 'The list items',
  })
  public async getListItems(
    @Parent() list: List,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<ListItem[]> {
    return this.listItemService.findAll(list, paginationArgs, searchArgs);
  }

  @ResolveField(() => Int, {
    name: 'totalItems',
    defaultValue: 0,
    description: 'The total number of items',
  })
  public async countListItemsByList(@Parent() list: List): Promise<number> {
    return this.listItemService.itemsCountByList(list);
  }
}
