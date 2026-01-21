import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput, UpdateItemInput } from './dto';


@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) { }

  @Mutation(() => Item)
  public async createItem(@Args('createItemInput') createItemInput: CreateItemInput): Promise<Item> {
    return this.itemsService.create(createItemInput);
  }

  @Query(() => [Item], { name: 'items' })
  public findAll() {
    return this.itemsService.findAll();
  }

  @Query(() => Item, { name: 'item' })
  public findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemsService.findOne(id);
  }

  @Mutation(() => Item)
  public updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput) {
    return this.itemsService.update(updateItemInput.id, updateItemInput);
  }

  @Mutation(() => Item)
  public removeItem(@Args('id', { type: () => Int }) id: number) {
    return this.itemsService.remove(id);
  }
}
