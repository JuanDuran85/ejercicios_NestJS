import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee, Flavor } from './entities';
import { FlavorsByCoffeeLoader } from './data-loader/flavors-by-coffee.loader';

@Resolver(() => Coffee)
export class CoffeeFlavorsResolver {
  constructor(
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly flavorsByCoffeeLoader: FlavorsByCoffeeLoader
  ) { }

  @ResolveField('flavors', () => [Flavor])
  public async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    /*  return this.flavorRepository
       .createQueryBuilder('flavor')
       .innerJoin('flavor.coffees', 'coffees', 'coffees.id = :coffeeId', {
         coffeeId: coffee.id,
       })
       .getMany(); */

    return this.flavorsByCoffeeLoader.load(coffee.id);
  }
}
