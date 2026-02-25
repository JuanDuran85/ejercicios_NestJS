import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateListInput {
  @Field(() => String, { description: 'The id of the list' })
  id: string;

  @Field(() => String, { description: 'The name of the list' })
  name: string;
}
