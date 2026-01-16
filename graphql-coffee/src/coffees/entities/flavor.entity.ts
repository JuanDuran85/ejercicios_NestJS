import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from './coffee.entity';

@ObjectType({ description: 'The flavor of a coffee' })
@Entity()
export class Flavor {
  @Field(() => ID, { nullable: false, description: 'The id of the flavor' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, {
    nullable: false,
    description: 'The name of the flavor',
  })
  @Column()
  name: string;

  @ManyToMany((type) => Coffee, (coffee) => coffee.flavors)
  coffees: Coffee[];
}
