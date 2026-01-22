import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateItemInput, UpdateItemInput } from './dto';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';


@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) { }

  @Mutation(() => Item)
  public async createItem(@Args('createItemInput') createItemInput: CreateItemInput): Promise<Item> {
    return this.itemsService.create(createItemInput);
  }

  @Query(() => [Item], { name: 'items' })
  public async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Query(() => Item, { name: 'item', description: 'return a item by id', nullable: false })
  public async findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string): Promise<Item | null> {
    return this.itemsService.findOne(id);
  }

  @Mutation(() => Item, { name: 'updateItem', description: 'update a item'})
  public async updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput): Promise<Item> {
    return this.itemsService.update(updateItemInput.id, updateItemInput);
  }

  @Mutation(() => Item)
  public removeItem(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string): Promise<Item> {
    return this.itemsService.remove(id);
  }
}
