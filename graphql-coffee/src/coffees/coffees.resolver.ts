import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity';
import { ParseIntPipe } from '@nestjs/common';

@Resolver()
export class CoffeesResolver {
  private readonly coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
    {
      id: 2,
      name: 'Cappuccino',
      brand: 'Starbucks',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  @Query(() => [Coffee], { name: 'coffees', description: 'Find all coffees' })
  public async findAll(): Promise<Coffee[]> {
    return this.coffees;
  }

  @Query(() => Coffee, {
    name: 'coffee',
    description: 'Find a coffee by id',
    nullable: true,
  })
  public async findOne(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Coffee | null> {
    return this.coffees.find((coffee) => coffee.id === id) || null;
  }
}
