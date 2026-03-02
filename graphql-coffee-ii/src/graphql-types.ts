
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateCoffeeInput {
    name: string;
    brand: string;
    flavors: string[];
}

export class UpdateCoffeeInput {
    name?: Nullable<string>;
    brand?: Nullable<string>;
    flavors?: Nullable<string[]>;
}

export class Coffee {
    __typename?: 'Coffee';
    id: number;
    name: string;
    brand: string;
    flavors: string[];
}

export abstract class IQuery {
    __typename?: 'IQuery';
    coffees: Coffee[];
    coffee?: Coffee;
}

export abstract class IMutation {
    __typename?: 'IMutation';
    createCoffee?: Coffee;
    updateCoffee?: Coffee;
    removeCoffee?: Coffee;
}

type Nullable<T> = T | null;
