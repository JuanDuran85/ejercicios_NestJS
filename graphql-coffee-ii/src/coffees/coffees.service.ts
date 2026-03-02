import { UserInputError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeInputDto, UpdateCoffeeInputDto } from './dto';
import { Flavor } from './entities';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>,
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

  public async create(
    createCoffeeInput: CreateCoffeeInputDto,
  ): Promise<Coffee> {
    const flavors: Flavor[] = await Promise.all(
      createCoffeeInput.flavors.map((name: string) =>
        this.preloadFlavorByName(name),
      ),
    );
    const coffee: Coffee = this.coffeesRepository.create({
      ...createCoffeeInput,
      flavors,
    });
    return this.coffeesRepository.save(coffee);
  }

  public async update(
    id: number,
    updateCoffeeInput: UpdateCoffeeInputDto,
  ): Promise<Coffee> {
    const flavors: Flavor[] | undefined =
      updateCoffeeInput.flavors &&
      (await Promise.all(
        updateCoffeeInput.flavors.map((name: string) =>
          this.preloadFlavorByName(name),
        ),
      ));
    const coffeeFound: Coffee | undefined =
      await this.coffeesRepository.preload({
        id: +id,
        ...updateCoffeeInput,
        flavors,
      });

    if (!coffeeFound) throw new UserInputError('Coffee not found');

    return this.coffeesRepository.save(coffeeFound);
  }

  public async remove(id: number): Promise<Coffee> {
    const coffeeFound: Coffee | null = await this.findOne(id);
    return this.coffeesRepository.remove(coffeeFound);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor: Flavor | null =
      await this.flavorsRepository.findOneBy({ name });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorsRepository.create({ name });
  }
}
