import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, MinLength } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({
    description: 'The name of a coffee.',
    example: 'Cappuccino',
    type: String,
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'The brand of a coffee.',
    example: 'Starbucks',
    type: String,
  })
  @IsString()
  @MinLength(1)
  readonly brand: string;

  @ApiProperty({
    description: 'The flavors of a coffee.',
    example: ['chocolate', 'vanilla'],
    type: [String],
  })
  @IsString({ each: true })
  @IsArray()
  readonly flavors: string[];
}
