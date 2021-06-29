import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  readonly description: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly status: boolean;
}
