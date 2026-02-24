import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, MinLength } from 'class-validator';

@ArgsType()
export class SearchArgs {
  @Field(() => String, {
    nullable: true,
    defaultValue: '',
    description: 'Search query',
    name: 'search',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  search?: string;
}
