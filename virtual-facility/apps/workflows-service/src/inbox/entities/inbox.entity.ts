import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Inbox {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  messageId: string;

  @Column()
  pattern: string;

  @Column({ enum: ['pending', 'processed'] })
  status: 'pending' | 'processed';

  @Column({ type: 'json' })
  payload: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  constructor(
    messageId: string,
    pattern: string,
    payload: Record<string, any>,
  ) {
    this.messageId = messageId;
    this.pattern = pattern;
    this.payload = payload;
  }
}
