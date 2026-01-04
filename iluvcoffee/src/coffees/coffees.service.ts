import { Injectable, NotFoundException } from '@nestjs/common';
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
    const existingCoffee: Coffee | undefined = this.findOne(id);
    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    this.coffees = this.coffees.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...updateCoffeeDto,
        };
      }
      return item;
    });
    return this.coffees;
  }

  public remove(id: string) {
    this.coffees = this.coffees.filter((item) => item.id !== id);
    return this.coffees;
  }
}
