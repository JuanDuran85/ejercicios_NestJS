import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";


@InputType('SignupInput')
export class SignupInput {
    @Field(() => String, { nullable: false, description: 'email of the user' })
    @IsEmail()
    email: string;

    @Field(() => String, { nullable: false, description: 'full name of the user' })
    @IsNotEmpty()
    @MinLength(3)
    fullName: string;

    @Field(() => String, { nullable: false, description: 'password of the user' })
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}