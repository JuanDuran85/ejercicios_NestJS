import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class SearchArgs {
  @Field(() => String, {
    nullable: true,
    defaultValue: undefined,
    description: 'Search query',
    name: 'search',
  })
  @IsOptional()
  @IsString()
  search?: string = undefined;
}
