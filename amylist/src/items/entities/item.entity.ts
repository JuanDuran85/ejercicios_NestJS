import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items' })
@ObjectType()
export class Item {
  @Field(() => ID, { description: 'The id of the item' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'The name of the item' })
  @Column()
  name: string;

  @Field(() => Float, { description: 'The quantity of the item' })
  @Column({ default: 0 })
  quantity: number

  @Field(() => String, { description: 'The units of the quantity' })
  @Column()
  quantityUnits: string;
}
