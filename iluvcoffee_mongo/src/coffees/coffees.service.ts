import { Injectable } from '@nestjs/common';

@Injectable()
export class CoffeesService {
  private coffees = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  public findAll() {
    return this.coffees;
  }

  public findOne(id: string) {
    return this.coffees.find((item) => item.id === +id);
  }

  public create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  public update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  public remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
