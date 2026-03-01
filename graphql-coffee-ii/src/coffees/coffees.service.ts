import { Injectable } from '@nestjs/common';
import { Coffee, CreateCoffeeInput } from '../graphql-types';

@Injectable()
export class CoffeesService {
  constructor() {}

  public async findAll(): Promise<Coffee[]> {
    return [];
  }

  public async findOne(id: number): Promise<Coffee | null> {
    return null;
  }

  public async create(createCoffeeInput: CreateCoffeeInput) {
    return null;
  }
}
