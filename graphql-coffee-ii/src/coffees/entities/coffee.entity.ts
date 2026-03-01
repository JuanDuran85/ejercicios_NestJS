import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as GraphQLType from '../../graphql-types';

@Entity('coffee')
export class Coffee implements GraphQLType.Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('json', { nullable: true })
  flavors: string[];
}
