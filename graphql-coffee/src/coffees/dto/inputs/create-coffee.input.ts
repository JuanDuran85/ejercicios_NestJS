import { Field, InputType } from '@nestjs/graphql';

import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType({ description: 'CreateCoffeeInput' })
export class CreateCoffeeInputDto {
  @Field(() => String, { description: 'The name of the coffee' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly name: string;

  @Field(() => String, { description: 'The brand of the coffee' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly brand: string;

  @Field(() => [String], { description: 'The flavors of the coffee' })
  @IsString({ each: true })
  @IsNotEmpty()
  @IsArray()
  readonly flavors: string[];
}
