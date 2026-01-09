import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService, type ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS, COFFEE_BRANDS_2 } from './coffees.constants';
import coffeesConfig from './config/coffees.config';
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
    private readonly dataSource: DataSource,
    @Inject(COFFEE_BRANDS) coffeeBrands: string[],
    @Inject(COFFEE_BRANDS_2) coffeeBrands2: string[],
    private readonly configService: ConfigService,
    @Inject(coffeesConfig.KEY)
    private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>,
  ) {
    console.debug(coffeeBrands);
    console.debug(coffeeBrands2);
    const hostExample = this.configService.get<string>('coffees');
    console.debug(hostExample);
    const nameSpaceCoffeeExample = coffeesConfiguration.foo;
    console.debug({ nameSpaceCoffeeExample });
  }

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

  public async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;
      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(String(error));
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
