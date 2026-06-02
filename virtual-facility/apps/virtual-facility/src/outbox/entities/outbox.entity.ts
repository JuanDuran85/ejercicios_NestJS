import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Outbox {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ type: 'json' })
  payload: Record<string, any>;

  @Column()
  target: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor(type: string, payload: Record<string, any>, target: string) {
    this.type = type;
    this.payload = payload;
    this.target = target;
  }
}
