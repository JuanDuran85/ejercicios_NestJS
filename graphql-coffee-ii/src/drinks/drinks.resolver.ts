import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Coffee, type Drink, Tea } from '../graphql-types';

@Resolver('Drink')
export class DrinksResolver {
  @Query('drinks')
  public async findAll(): Promise<Drink[]> {
    const coffee: Coffee = new Coffee();
    coffee.id = 1;
    coffee.name = 'Colombia BC';
    coffee.brand = 'Black Crow';

    const tea: Tea = new Tea();
    tea.name = 'Lipton Yellow Label';

    const drinks: Drink[] = [coffee, tea];
    return drinks;
  }

  @ResolveField()
  __resolveType(value: Drink) {
    if ('brand' in value) {
      return 'Coffee';
    }
    return 'Tea';
  }
}
