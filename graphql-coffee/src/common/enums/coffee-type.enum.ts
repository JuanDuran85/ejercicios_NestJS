import { registerEnumType } from "@nestjs/graphql";

export enum CoffeeType {
    ARABICA = 'Arabica',
    ROBUSTA = 'Robusta',
    EXCELSA = 'Excelsa',
    LIBERICA = 'Liberica',
}

registerEnumType(CoffeeType, {
    name: 'CoffeeType',
    description: 'The type of coffee',
})