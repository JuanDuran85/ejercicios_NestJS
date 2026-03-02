import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as GraphQLType from '../../graphql-types';
import { Coffee } from './coffee.entity';

@Entity('flavor')
export class Flavor implements GraphQLType.Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ManyToMany((type) => Coffee, (coffee: Coffee) => coffee.flavors)
  coffees: Coffee[];
}
