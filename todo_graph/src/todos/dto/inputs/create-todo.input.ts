import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => String, { nullable: false })
  title: string;
}
