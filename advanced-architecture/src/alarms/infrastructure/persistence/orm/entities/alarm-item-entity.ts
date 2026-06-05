import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { AlarmEntity } from './alarm.entity';

@Entity('alarm_items')
export class AlarmItemEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => AlarmEntity, (alarm: AlarmEntity) => alarm.items, { nullable: true })
  alarm!: AlarmEntity;

  constructor(id: string, name: string, type: string) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}
