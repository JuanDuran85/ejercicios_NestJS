import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateItemInput } from './create-item.input';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => ID, { description: 'The id of the item', nullable: false })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
