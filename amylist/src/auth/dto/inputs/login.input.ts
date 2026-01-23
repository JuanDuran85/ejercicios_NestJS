import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType('LoginInput')
export class LoginInput {
  @Field(() => String, { nullable: false, description: 'email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: false, description: 'password of the user' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
