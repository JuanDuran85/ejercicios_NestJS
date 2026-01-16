
import { Query, Resolver } from '@nestjs/graphql';
import { Drink } from '../common/interfaces/drink.interface';
import { Coffee } from '../coffees';
import { Tea } from '../teas';

@Resolver()
export class DrinksResolver {
    @Query(() => [Drink], { name: 'drinks', nullable: false })
    public async findAll(): Promise<Drink[]> {
        const coffee: Coffee = new Coffee();
        coffee.name = 'Colombia';
        coffee.brand = 'Nescafe';
        coffee.id = 1;

        const tea: Tea = new Tea();
        tea.name = 'Lipton';
        tea.brand = 'Lipton';
        return [tea, coffee];
    }
}
