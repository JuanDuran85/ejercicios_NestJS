import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { ValidRoles } from '../../../auth/enum';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID, { description: 'The id of the user', nullable: false })
  @IsUUID()
  id: string;

  @Field(() => [ValidRoles], {
    nullable: true,
    description: 'Valid roles of the user',
  })
  @IsArray()
  @IsOptional()
  roles?: ValidRoles[];
  
  @Field(() => Boolean, {
    nullable: true,
    description: 'Is the user blocked',
  })
  @IsBoolean()
  @IsOptional()
  isBlocked?: boolean;
}
