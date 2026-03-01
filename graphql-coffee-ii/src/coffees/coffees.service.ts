import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeInput } from '../graphql-types';
import { Coffee } from './entities/coffee.entity';
import { UserInputError } from '@nestjs/apollo';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) {}

  public async findAll(): Promise<Coffee[]> {
    return this.coffeesRepository.find();
  }

  public async findOne(id: number): Promise<Coffee> {
    const coffeeFound: Coffee | null = await this.coffeesRepository.findOneBy({
      id,
    });
    if (!coffeeFound) {
      throw new UserInputError('Coffee not found');
    }
    return coffeeFound;
  }

  public async create(createCoffeeInput: CreateCoffeeInput): Promise<Coffee> {
    const coffee: Coffee = this.coffeesRepository.create(createCoffeeInput);
    return this.coffeesRepository.save(coffee);
  }
}
