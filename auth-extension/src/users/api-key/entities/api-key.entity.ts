import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../../entities';

@Entity()
export class ApiKey {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  key!: string;

  @Column()
  uuid!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne((type) => User, (user: User) => user.apiKeys)
  user!: User;
}
