import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty({ message: 'Brand is required' })
  public readonly brand: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  public readonly model: string;

  @IsString()
  @IsNotEmpty()
  public readonly year: number;
}
