import { AlarmItemEntity } from './alarm-item.entity';

export class AlarmEntity {
  id: string;
  name: string;
  severity: string;
  triggeredAt: Date;
  isAcknowledged: boolean;
  items: Array<AlarmItemEntity>;

  constructor(
    id: string,
    name: string,
    severity: string,
    triggeredAt: Date,
    isAcknowledged: boolean,
    items: Array<AlarmItemEntity>,
  ) {
    this.id = id;
    this.name = name;
    this.severity = severity;
    this.triggeredAt = triggeredAt;
    this.isAcknowledged = isAcknowledged;
    this.items = items;
  }
}
