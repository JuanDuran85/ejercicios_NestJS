import { createUnionType } from "@nestjs/graphql";
import { Coffee } from "../../coffees";
import { Tea } from "../../teas";


export const DrinksResultUnion = createUnionType({
    name: 'DrinksResult',
    types: () => [Coffee, Tea], // this is the list of object types the union can be
})