import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateListInput } from './create-list.input';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateListInput extends PartialType(CreateListInput) {
  @Field(() => ID, { description: 'The id of the list', nullable: false })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
