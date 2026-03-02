import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as GraphQLType from '../../graphql-types';
import { Flavor } from './flavor.entity';

@Entity('coffee')
export class Coffee implements GraphQLType.Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  brand: string;

  @JoinTable()
  @ManyToMany(() => Flavor, (flavor: Flavor) => flavor.coffees, {
    cascade: true,
    eager: true,
  })
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt?: Date | null;
}
