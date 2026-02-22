import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({ type: 'boolean', default: true, nullable: false })
  @Field(() => Boolean, {
    description: 'The status of the user',
    nullable: false,
  })
  isBlocked: boolean;

  @ManyToOne(() => User, (user) => user.lastUpdateBy, { nullable: true })
  @JoinColumn({ name: 'lastUpdateBy' })
  @Field(() => User, { nullable: true })
  lastUpdateBy?: User;
}
