import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  public async findAll(): Promise<Coffee[]> {
    return this.coffeeRepository.find();
  }

  public async findOne(id: string): Promise<Coffee> {
    const coffee: Coffee | null = await this.coffeeRepository.findOne({
      where: { id: Number(id) },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  public async create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const coffeeNew: Coffee = this.coffeeRepository.create(createCoffeeDto);
    await this.coffeeRepository.save(coffeeNew);
    return coffeeNew;
  }

  public async update(
    id: string,
    updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<Coffee> {
    const coffeePre: Coffee | undefined = await this.coffeeRepository.preload({
      id: Number(id),
      ...updateCoffeeDto,
    });

    if (!coffeePre) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return await this.coffeeRepository.save(coffeePre);
  }

  public async remove(id: string): Promise<Coffee> {
    const coffee: Coffee = await this.findOne(id);
    return await this.coffeeRepository.remove(coffee);
  }
}
