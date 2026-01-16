
import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from '../coffees';
import { DrinksResultUnion } from '../common/unions/drinks-result.union';
import { Tea } from '../teas';

@Resolver()
export class DrinksResolver {
    @Query(() => [DrinksResultUnion], { name: 'drinks', nullable: false })
    public async findAll(): Promise<typeof DrinksResultUnion[]> {
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
