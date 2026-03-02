import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';
import { UpdateCoffeeInput } from '../../../graphql-types';

export class UpdateCoffeeInputDto extends UpdateCoffeeInput {
  @MinLength(3)
  @IsOptional()
  declare readonly name?: string;

  @MinLength(2)
  @IsString()
  @IsOptional()
  declare readonly brand?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  declare readonly flavors?: string[];
}
