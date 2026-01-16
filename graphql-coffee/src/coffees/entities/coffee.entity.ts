import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Coffee model' })
export class Coffee {
  @Field(() => ID, { description: 'The id of the coffee', nullable: false })
  id: number;

  @Field(() => String, { description: 'The name of the coffee' })
  name: string;

  @Field(() => String, { description: 'The brand of the coffee' })
  brand: string;

  @Field(() => [String], { description: 'The flavors of the coffee' })
  flavors: string[];
}
