
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

export class Coffee {
    __typename?: 'Coffee';
    id: number;
    name: string;
    brand: string;
    flavors: string[];
    createdAt: string;
    updatedAt: string;
}

export abstract class IQuery {
    __typename?: 'IQuery';
    coffees: Coffee[];
    coffee?: Nullable<Coffee>;
}

export abstract class IMutation {
    __typename?: 'IMutation';
    createCoffee?: Nullable<Coffee>;
}

type Nullable<T> = T | null;
