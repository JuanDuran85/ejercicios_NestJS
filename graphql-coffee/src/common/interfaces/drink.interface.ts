import { Field, InterfaceType } from "@nestjs/graphql";


@InterfaceType({ description: 'Drink Interface' })
export abstract class Drink {
    @Field(() => String)
    name: string;

    @Field(() => String)
    brand: string;
}
