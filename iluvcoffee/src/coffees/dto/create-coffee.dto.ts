import { IsString, MinLength } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: string[];
}
