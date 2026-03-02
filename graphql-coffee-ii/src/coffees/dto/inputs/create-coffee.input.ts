import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateCoffeeInput } from '../../../graphql-types';

export class CreateCoffeeInputDto extends CreateCoffeeInput {
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  declare readonly name: string;

  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  declare readonly brand: string;

  @IsArray()
  @IsString({ each: true })
  declare readonly flavors: string[];
}
