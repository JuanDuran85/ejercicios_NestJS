import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @IsPositive()
  no: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;
}
