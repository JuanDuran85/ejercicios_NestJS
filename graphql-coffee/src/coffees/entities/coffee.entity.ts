import { Field, ID, ObjectType } from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';
import { Drink } from '../../common/interfaces/drink.interface';

@ObjectType({ description: 'Coffee model', implements: () => Drink })
@Entity()
export class Coffee implements Drink {
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

  @CreateDateColumn()
  createdAt?: Date;
}
