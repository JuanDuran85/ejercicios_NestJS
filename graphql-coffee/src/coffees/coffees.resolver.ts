import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCoffeeDto } from './dto';
import { Coffee } from './entities/coffee.entity';

@Resolver()
export class CoffeesResolver {
  private coffees: Coffee[] = [
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

  @Mutation(() => Coffee, { name: 'createCoffee' })
  public async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeDto,
  ): Promise<Coffee> {
    const newCoffee: Coffee = new Coffee();
    newCoffee.id = this.coffees.length + 1;
    newCoffee.name = createCoffeeInput.name;
    newCoffee.brand = createCoffeeInput.brand;
    newCoffee.flavors = createCoffeeInput.flavors;
    this.coffees.push(newCoffee);

    return newCoffee;
  }
}
