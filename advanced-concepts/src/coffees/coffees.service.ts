import { Inject, Injectable } from '@nestjs/common';
import { LazyModuleLoader, ModuleRef } from '@nestjs/core';
import { COFFEES_DATA_SOURCE } from './const/coffees_data_source.const';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

export interface CoffeesDataSource {
  [index: number]: Coffee;
}

@Injectable()
export class CoffeesService {
  constructor(
    @Inject(COFFEES_DATA_SOURCE)
    private readonly coffeesDataSource: CoffeesDataSource,
    private readonly lazyModuleLoader: LazyModuleLoader,
  ) {}

  public async create(createCoffeeDto: CreateCoffeeDto): Promise<string> {
    console.time('createCoffee');
    const rewardsModuleRef: ModuleRef = await this.lazyModuleLoader.load(() =>
      import('../rewards/rewards.module.js').then((m) => m.RewardsModule),
    );

    const { RewardsService } = await import('../rewards/rewards.service.js');
    const rewardsService = rewardsModuleRef.get(RewardsService);

    console.timeEnd('createCoffee');

    rewardsService.grantTo();

    return 'This action adds a new coffee';
  }

  public findAll(): string {
    return `This action returns all coffees`;
  }

  public findOne(id: number): string {
    return `This action returns a #${id} coffee`;
  }

  public update(id: number, updateCoffeeDto: UpdateCoffeeDto): string {
    return `This action updates a #${id} coffee`;
  }

  public remove(id: number): string {
    return `This action removes a #${id} coffee`;
  }
}
