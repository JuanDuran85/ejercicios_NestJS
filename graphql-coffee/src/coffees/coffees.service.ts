import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateCoffeeInputDto, UpdateCoffeeInputDto } from './dto';

import { PubSub } from 'graphql-subscriptions';
import { Flavor } from './entities';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly pubsub: PubSub,
  ) { }

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
    const flavors: Flavor[] = await Promise.all(
      createCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const coffeeNew: Coffee = this.coffeeRepository.create({
      ...createCoffeeInput,
      flavors,
    });

    const newCoffeeEntity: Coffee = await this.coffeeRepository.save(coffeeNew)

    this.pubsub.publish('coffeeAdded', { coffeeAdded: newCoffeeEntity });
    return newCoffeeEntity;


  }

  public async update(id: number, updateCoffeeInput: UpdateCoffeeInputDto) {
    const flavors =
      updateCoffeeInput.flavors &&
      (await Promise.all(
        updateCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
      ));
    const coffeeFound: Coffee | undefined = await this.coffeeRepository.preload(
      {
        id,
        ...updateCoffeeInput,
        flavors,
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

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor: Flavor | null = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) return existingFlavor;
    return this.flavorRepository.create({ name });
  }
}
