import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int, {
    nullable: false,
    description: 'id of the todo to update',
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  id: number;

  @Field(() => String, {
    nullable: true,
    description: 'description of the todo',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @IsOptional()
  description?: string;

  @Field(() => String, { nullable: true, description: 'title of the todo' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @IsOptional()
  title?: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'status of the todo',
  })
  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
