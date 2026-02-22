import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

@InputType({ description: 'The input for creating an item' })
export class CreateItemInput {
  @Field(() => String, { description: 'The name of the item' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  /*   @Field(() => Float, { description: 'The quantity of the item' })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  quantity: number */

  @Field(() => String, {
    description: 'The units of the quantity',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  quantityUnits?: string;
}
