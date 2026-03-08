import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Coffee } from '../graphql-types';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeInputDto, UpdateCoffeeInputDto } from './dto';

@Resolver()
export class CoffeesResolver {
  constructor(
    private readonly coffeesService: CoffeesService,
    private readonly pubSub: PubSub,
  ) {}

  @Query('coffees')
  public async findAll(): Promise<Coffee[]> {
    return this.coffeesService.findAll();
  }

  @Query('coffee')
  public async findOne(@Args('id', ParseIntPipe) id: number): Promise<Coffee> {
    return this.coffeesService.findOne(id);
  }

  @Mutation('createCoffee')
  public async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInputDto,
  ): Promise<Coffee> {
    return this.coffeesService.create(createCoffeeInput);
  }

  @Mutation('updateCoffee')
  public async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInputDto,
  ): Promise<Coffee> {
    return this.coffeesService.update(id, updateCoffeeInput);
  }

  @Mutation('removeCoffee')
  public async remove(@Args('id', ParseIntPipe) id: number): Promise<Coffee> {
    return this.coffeesService.remove(id);
  }

  @Subscription()
  public coffeeAdded() {
    return this.pubSub.asyncIterableIterator('coffeeAdded');
  }
}
