import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  description: string;
  
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title: string;
}
