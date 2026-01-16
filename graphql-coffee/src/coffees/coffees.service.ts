import { Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
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

  public async findAll(): Promise<Coffee[]> {
    return this.coffees;
  }

  public async findOne(id: number): Promise<Coffee | null> {
    return this.coffees.find((coffee) => coffee.id === id) || null;
  }

  public async create(createCoffeeInput: CreateCoffeeDto): Promise<Coffee> {
    const newCoffee: Coffee = new Coffee();
    newCoffee.id = this.coffees.length + 1;
    newCoffee.name = createCoffeeInput.name;
    newCoffee.brand = createCoffeeInput.brand;
    newCoffee.flavors = createCoffeeInput.flavors;
    this.coffees.push(newCoffee);

    return newCoffee;
  }
}
