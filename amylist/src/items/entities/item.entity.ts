import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
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

@Entity({ name: 'items' })
@ObjectType()
export class Item {
  @Field(() => ID, { description: 'The id of the item' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'The name of the item' })
  @Column()
  name: string;

  @Field(() => Float, {
    description: 'The quantity of the item',
    nullable: true,
    defaultValue: 0,
  })
  @Column({ default: 0, nullable: true })
  quantity?: number;

  @Field(() => String, {
    description: 'The category of the item',
    nullable: true,
    defaultValue: 'unknown',
  })
  @Column({ default: 'unknown', nullable: true })
  category?: string;

  @Field(() => String, {
    description: 'The units of the quantity',
    nullable: true,
  })
  @Column({ nullable: true })
  quantityUnits?: string;

  @Field(() => User, { nullable: false, description: 'The user' })
  @ManyToOne(() => User, (user: User) => user.items, {
    nullable: false,
    lazy: true,
  })
  @Index('userId-index')
  user: User;

  @OneToMany(() => ListItem, (listItem: ListItem) => listItem.item, {
    lazy: true,
  })
  @Field(() => [ListItem], { nullable: true, description: 'The list items' })
  listItem: ListItem[];
}
