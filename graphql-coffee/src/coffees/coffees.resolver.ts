import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CoffeesService } from './coffees.service';
import { CreateCoffeeInputDto, UpdateCoffeeInputDto } from './dto';

import { PubSub } from 'graphql-subscriptions';
import { Coffee } from './entities/coffee.entity';

@Resolver()
export class CoffeesResolver {
  constructor(private readonly coffeeService: CoffeesService, private readonly pubsub: PubSub) { }

  @Query(() => [Coffee], { name: 'coffees', description: 'Find all coffees' })
  public async findAll(): Promise<Coffee[]> {
    return this.coffeeService.findAll();
  }

  @Query(() => Coffee, {
    name: 'coffee',
    description: 'Find a coffee by id',
    nullable: false,
  })
  public async findOne(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Coffee | null> {
    return this.coffeeService.findOne(id);
  }

  @Mutation(() => Coffee, { name: 'createCoffee' })
  public async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInputDto,
  ): Promise<Coffee> {
    return this.coffeeService.create(createCoffeeInput);
  }

  @Mutation(() => Coffee, { name: 'updateCoffee' })
  public async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInputDto,
  ): Promise<Coffee> {
    return this.coffeeService.update(id, updateCoffeeInput);
  }

  @Mutation(() => Coffee, { name: 'removeCoffee' })
  public async remove(@Args('id', ParseIntPipe) id: number): Promise<Coffee> {
    return this.coffeeService.remove(id);
  }
}
