import { Field, ID, ObjectType } from '@nestjs/graphql';

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@ObjectType({ description: 'Coffee model' })
@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'The id of the coffee', nullable: false })
  id: number;

  @Column()
  @Field(() => String, { description: 'The name of the coffee' })
  name: string;

  @Column()
  @Field(() => String, { description: 'The brand of the coffee' })
  brand: string;

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors?: Flavor[];
}
