import { Field, ID, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

@InputType()
export class CreateListItemInput {
  @Field(() => Int, {
    description: 'The quantity of the item',
    nullable: true,
    defaultValue: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  quantity: number = 0;

  @Field(() => Boolean, {
    nullable: true,
    defaultValue: false,
    description: 'Whether the item has been completed',
  })
  @IsBoolean()
  @IsOptional()
  completed: boolean = false;

  @Field(() => ID, { description: 'The id of the list', nullable: false })
  @IsUUID()
  @IsNotEmpty()
  listId: string;

  @Field(() => ID, { description: 'The id of the item', nullable: false })
  @IsUUID()
  @IsNotEmpty()
  itemId: string;
}
