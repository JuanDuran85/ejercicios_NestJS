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
import { CoffeeType } from '../../common/enums/coffee-type.enum';
import { loggerMiddleware } from '../../common/middleware/logger.middleware';

@ObjectType({ description: 'Coffee model', implements: () => Drink })
@Entity()
export class Coffee implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'The id of the coffee', nullable: false })
  id: number;

  @Field(() => String, { description: 'The name of the coffee', middleware: [loggerMiddleware] })
  @Column()
  name: string;

  @Field(() => String, { description: 'The brand of the coffee' })
  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt?: Date;

  @Column({
    type: 'enum',
    enum: CoffeeType,
    default: CoffeeType.ARABICA,
    nullable: true,
  })
  type?: CoffeeType;
}
