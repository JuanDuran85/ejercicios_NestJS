import { Field, Float, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from 'class-validator';

@InputType({ description: 'The input for creating an item' })
export class CreateItemInput {
  @Field(() => String, { description: 'The name of the item' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @Field(() => Float, { description: 'The quantity of the item', defaultValue: 0 })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  @Min(0)
  quantity: number

  @Field(() => String, { description: 'The units of the quantity', nullable: true })
  @IsOptional()
  @IsString()
  quantityUnits?: string;
}
