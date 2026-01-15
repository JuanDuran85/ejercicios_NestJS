import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => Int, { description: 'Todo unique identifier' })
  id: number;

  @Field(() => String, { description: 'Todo title' })
  title: string;

  @Field(() => String, { description: 'Todo description' })
  description: string;

  @Field(() => Boolean, { description: 'Todo status', defaultValue: false })
  done: boolean = false;
}
