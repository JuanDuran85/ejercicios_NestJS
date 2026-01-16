import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateCoffeeInputDto, UpdateCoffeeInputDto } from './dto';

import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  public async findAll(): Promise<Coffee[]> {
    return this.coffeeRepository.find();
  }

  public async findOne(id: number): Promise<Coffee | null> {
    const coffeeFound: Coffee | null = await this.coffeeRepository.findOne({
      where: { id },
    });

    if (!coffeeFound) throw new NotFoundException(`Coffee #${id} not found`);

    return coffeeFound;
  }

  public async create(
    createCoffeeInput: CreateCoffeeInputDto,
  ): Promise<Coffee> {
    const coffeeNew: Coffee = this.coffeeRepository.create(createCoffeeInput);
    return this.coffeeRepository.save(coffeeNew);
  }

  public async update(id: number, updateCoffeeInput: UpdateCoffeeInputDto) {
    const coffeeFound: Coffee | undefined = await this.coffeeRepository.preload(
      {
        id,
        ...updateCoffeeInput,
      },
    );

    if (!coffeeFound) throw new NotFoundException(`Coffee #${id} not found`);

    return this.coffeeRepository.save(coffeeFound);
  }

  public async remove(id: number): Promise<Coffee> {
    console.debug({ id });
    const coffeeFound: Coffee | null = await this.findOne(id);
    const result: Coffee = await this.coffeeRepository.remove(coffeeFound!);
    result.id = id;
    console.debug({ result });
    return result;
  }
}
