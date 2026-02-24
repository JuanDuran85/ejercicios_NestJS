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
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ValidRoles } from '../auth/enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ItemsService } from '../items/items.service';
import { ValidRolesArgs } from './dto/args/roles.arg';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Item } from '../items/entities/item.entity';
import { PaginationArgs, SearchArgs } from '../common';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,
  ) {}

  @Query(() => [User], { name: 'users' })
  public async findAll(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<User[]> {
    return this.usersService.findAll(validRoles.roles);
  }

  @Query(() => User, { name: 'user' })
  public async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ValidRoles.admin, ValidRoles.seo]) user: User,
  ): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => User, { name: 'blockUser' })
  public async blockUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<User> {
    console.debug('BlocUser method');
    return this.usersService.block(id, user);
  }

  @Mutation(() => User, { name: 'unblockUser' })
  public async unblockUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<User> {
    console.debug('BlocUser method');
    return this.usersService.unblock(id, user);
  }

  @Mutation(() => User, { name: 'updateUser' })
  public async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput, user);
  }

  @ResolveField(() => Int, {
    name: 'itemsCount',
    description: 'The number of items of the user',
    defaultValue: 0,
  })
  public async itemsCount(
    @CurrentUser([ValidRoles.admin]) adminUser: User,
    @Parent() user: User,
  ): Promise<number> {
    return this.itemsService.itemsCountByUser(user);
  }

  @ResolveField(() => [Item], {
    name: 'items',
    description: 'The items of the user',
    nullable: false,
  })
  public async getItemsByUser(
    @CurrentUser([ValidRoles.admin]) adminUser: User,
    @Parent() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() search: SearchArgs,
  ): Promise<Item[]> {
    return this.itemsService.findAll(user, paginationArgs, search);
  }
}
