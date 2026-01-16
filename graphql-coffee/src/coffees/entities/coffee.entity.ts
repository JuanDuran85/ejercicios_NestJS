import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'Coffee model' })
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

  @Column({ type: 'json' })
  @Field(() => [String], { description: 'The flavors of the coffee' })
  flavors: string[];
}
