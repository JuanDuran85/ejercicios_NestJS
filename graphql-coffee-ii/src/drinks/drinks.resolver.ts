import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Coffee, type Drink, DrinksResult, Tea } from '../graphql-types';

@Resolver('DrinksResult')
export class DrinksResolver {
  @Query('drinks')
  public async findAll(): Promise<DrinksResult[]> {
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
