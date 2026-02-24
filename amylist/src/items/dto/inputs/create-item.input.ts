import { Field, Float, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

@InputType({ description: 'The input for creating an item' })
export class CreateItemInput {
  @Field(() => String, { description: 'The name of the item' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @Field(() => Float, {
    description: 'The quantity of the item',
    nullable: true,
    defaultValue: 0,
  })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  @Min(0, { message: 'Quantity must be greater than or equal to 0' })
  quantity?: number = 0;

  @Field(() => String, {
    description: 'The category of the item',
    nullable: true,
    defaultValue: 'unknown',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  category?: string = 'unknown';

  @Field(() => String, {
    description: 'The units of the quantity',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  quantityUnits?: string;
}
