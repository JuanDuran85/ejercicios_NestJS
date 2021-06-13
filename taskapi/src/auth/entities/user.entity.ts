/* eslint-disable prettier/prettier */

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from 'src/tasks/entities/task.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  username: string;
  
  @Column()
  password: string;

  @OneToMany((_type) => TaskEntity, task => task.user, {eager: true})
  tasks: TaskEntity[];
}
