import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: '1',
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
    {
      id: '2',
      name: 'Cappuccino',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
    {
      id: '3',
      name: 'Espresso',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
    {
      id: '4',
      name: 'Latte',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  public findAll() {
    return this.coffees;
  }

  public findOne(id: string) {
    return this.coffees.find((item) => item.id === id);
  }

  public create(createCoffeeDto: CreateCoffeeDto) {
    this.coffees.push({
      ...createCoffeeDto,
      id: String(this.coffees.length + 1),
    });
    return this.coffees;
  }

  public update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
    return this.coffees;
  }

  public remove(id: string) {
    this.coffees = this.coffees.filter((item) => item.id !== id);
    return this.coffees;
  }
}
