import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as GraphQLType from '../../graphql-types';

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

  @Column('json', { nullable: true })
  flavors: string[];
}
