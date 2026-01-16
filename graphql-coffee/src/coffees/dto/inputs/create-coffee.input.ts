import { Field, InputType } from '@nestjs/graphql';

import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { CoffeeType } from '../../../common/enums/coffee-type.enum';

@InputType({ description: 'CreateCoffeeInput' })
export class CreateCoffeeInputDto {
  @Field(() => String, { description: 'The name of the coffee' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
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

  @Field(() => CoffeeType, { description: 'The type of the coffee' })
  @IsOptional()
  @IsEnum(CoffeeType)
  readonly type: CoffeeType;
}
