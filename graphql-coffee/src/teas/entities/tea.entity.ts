import { ObjectType } from "@nestjs/graphql";
import { Drink } from "../../common/interfaces/drink.interface";

@ObjectType({ implements: () => Drink, description: 'Tea' })
export class Tea implements Drink{
    name: string;
    brand: string;
}
