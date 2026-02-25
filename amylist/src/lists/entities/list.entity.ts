import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'lists' })
@ObjectType()
export class List {
  @Field(() => ID, { description: 'The id of the list', nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'The name of the list', nullable: false })
  @Column()
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  name: string;

  @ManyToOne(() => User, (user: User) => user.lists, {
    nullable: false,
  })
  @Index('userId-list-index')
  user: User;
}
