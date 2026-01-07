import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  public async findAll(pagination: PaginationQueryDto): Promise<Coffee[]> {
    const { limit = 10, offset = 0 } = pagination;
    return this.coffeeRepository.find({
      relations: ['flavors'],
      take: limit,
      skip: offset,
    });
  }

  public async findOne(id: string): Promise<Coffee> {
    const coffee: Coffee | null = await this.coffeeRepository.findOne({
      where: { id: Number(id) },
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  public async create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const flavorSearch: Flavor[] = await Promise.all(
      createCoffeeDto.flavors.map((name: string) =>
        this.preloadFlavorByName(name),
      ),
    );

    const coffeeNew: Coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors: flavorSearch,
    });
    await this.coffeeRepository.save(coffeeNew);
    return coffeeNew;
  }

  public async update(
    id: string,
    updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<Coffee> {
    const flavorSearch: Flavor[] | undefined =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name: string) =>
          this.preloadFlavorByName(name),
        ),
      ));

    const coffeePre: Coffee | undefined = await this.coffeeRepository.preload({
      id: Number(id),
      ...updateCoffeeDto,
      flavors: flavorSearch,
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

  public async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor: Flavor | null = await this.flavorRepository.findOne({
      where: { name },
    });

    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorRepository.create({ name });
  }
}
