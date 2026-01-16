import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee, Flavor } from './entities';

@Resolver(() => Coffee)
export class CoffeeFlavorsResolver {
  constructor(
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  @ResolveField('flavors', () => [Flavor])
  public async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    return this.flavorRepository
      .createQueryBuilder('flavor')
      .innerJoin('flavor.coffees', 'coffees', 'coffees.id = :coffeeId', {
        coffeeId: coffee.id,
      })
      .getMany();
  }
}
