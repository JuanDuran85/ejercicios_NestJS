import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlarmItemEntity } from './alarm-item-entity';

@Entity('alarms')
export class AlarmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  severity: string;

  @Column()
  triggeredAt: Date;

  @Column()
  isAcknowledged: boolean;

  @OneToMany(() => AlarmItemEntity, (item: AlarmItemEntity) => item.alarm, {
    cascade: true,
  })
  items: AlarmItemEntity[];

  constructor(
    id: string,
    name: string,
    severity: string,
    triggeredAt: Date,
    isAcknowledged: boolean,
    items: AlarmItemEntity[],
  ) {
    this.id = id;
    this.name = name;
    this.severity = severity;
    this.triggeredAt = triggeredAt;
    this.isAcknowledged = isAcknowledged;
    this.items = items;
  }
}
