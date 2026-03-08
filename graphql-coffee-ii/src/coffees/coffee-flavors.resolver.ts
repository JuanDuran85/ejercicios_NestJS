import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { FlavorsByCoffeeLoader } from './data-loader/flavors-by-coffee.loader';
import { Coffee } from './entities/coffee.entity';

@Resolver('Coffee')
export class CoffeeFlavorsResolver {
  constructor(
    private readonly flavorsByCoffeeLoaderRepository: FlavorsByCoffeeLoader,
  ) {}

  @ResolveField('flavors')
  public async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    return this.flavorsByCoffeeLoaderRepository.load(coffee.id);
  }
}
