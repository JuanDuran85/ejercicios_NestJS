import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('alarms')
export class AlarmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  severity: string;

  constructor(id: string, name: string, severity: string) {
    this.id = id;
    this.name = name;
    this.severity = severity;
  }
}
