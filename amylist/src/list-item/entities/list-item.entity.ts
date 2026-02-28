import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Item } from '../../items/entities/item.entity';
import { List } from '../../lists/entities/list.entity';

@Entity('listItems')
@Unique('listId-itemId-index', ['list', 'item'])
@ObjectType()
export class ListItem {
  @Field(() => ID, { description: 'The id of the list item', nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Number, {
    description: 'The quantity of the item',
    nullable: false,
    defaultValue: 0,
  })
  @Column({ type: 'numeric', default: 0, nullable: false })
  quantity: number;

  @Field(() => Boolean, {
    description: 'Whether the item has been completed',
    nullable: false,
    defaultValue: false,
  })
  @Column({ type: 'boolean', default: false, nullable: false })
  completed: boolean;

  @ManyToOne(() => List, (list: List) => list.listItem, { lazy: true })
  @Field(() => List, { nullable: false, description: 'The list' })
  list: List;

  @ManyToOne(() => Item, (item: Item) => item.listItem, { lazy: true })
  @Field(() => Item, { nullable: false, description: 'The item' })
  item: Item;
}
