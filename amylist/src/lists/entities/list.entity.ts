import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ListItem } from '../../list-item/entities/list-item.entity';
import { User } from '../../users/entities/user.entity';

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
    lazy: true,
  })
  @Index('userId-list-index')
  @Field(() => User, { nullable: false, description: 'The user' })
  user: User;

  @OneToMany(() => ListItem, (listItem: ListItem) => listItem.list, {
    lazy: true,
  })
 // @Field(() => [ListItem], { nullable: false, description: 'The list items' })
  listItem: ListItem[];
}
