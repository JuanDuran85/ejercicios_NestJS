import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto';

import { Coffee } from './entities/coffee.entity';

@Resolver()
export class CoffeesResolver {
  constructor(private readonly coffeeService: CoffeesService) {}

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
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeDto,
  ): Promise<Coffee> {
    return this.coffeeService.create(createCoffeeInput);
  }
}
