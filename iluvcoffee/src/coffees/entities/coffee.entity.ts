import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of a coffee.' })
  @Column()
  name: string;

  @ApiProperty({ description: 'The brand of a coffee.' })
  @Column()
  brand: string;

  @ApiProperty({ description: 'The recommendations of a coffee.' })
  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor: Flavor) => flavor.coffees, {
    cascade: true, // ['insert']
  })
  flavors: Flavor[];
}
