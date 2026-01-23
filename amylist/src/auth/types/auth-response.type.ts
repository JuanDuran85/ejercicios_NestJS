import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class AuthResponse {
  @Field(() => String, { nullable: false, description: 'The token' })
  token: string;

  @Field(() => User, { nullable: false, description: 'The user' })
  user: User;
}
