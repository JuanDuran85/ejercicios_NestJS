import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '../../items/entities/item.entity';
// DIAGNOSTIC: Changed from barrel import to direct entity import to avoid circular dependency
import { List } from '../../lists/entities/list.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'The id of the user', nullable: false })
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  @Field(() => String, {
    description: 'The first name of the user',
    nullable: false,
  })
  fullName: string;

  @Column({ unique: true })
  @Field(() => String, {
    description: 'The email of the user',
    nullable: false,
  })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'text', array: true, default: ['user'], nullable: false })
  @Field(() => [String], {
    description: 'The roles of the user',
    nullable: false,
  })
  roles: string[];

  @Column({ type: 'boolean', default: false, nullable: false })
  @Field(() => Boolean, {
    description: 'The status of the user',
    nullable: false,
    defaultValue: false,
  })
  isBlocked: boolean;

  @ManyToOne(() => User, (user) => user.lastUpdateBy, {
    nullable: true,
    lazy: true,
  })
  @JoinColumn({ name: 'lastUpdateBy' })
  @Field(() => User, { nullable: true, description: 'The last update by user' })
  lastUpdateBy?: User;

  @OneToMany(() => Item, (item: Item) => item.user, {
    nullable: false,
    lazy: true,
  })
  items: Item[];

  @OneToMany(() => List, (list: List) => list.user, {
    nullable: false,
  })
  lists: List[];
}
