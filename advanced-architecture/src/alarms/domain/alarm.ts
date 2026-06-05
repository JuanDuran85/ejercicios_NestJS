import { AlarmItem } from './alarm-item';
import { AlarmSeverity } from './value-objects/alarm-severity';

export class Alarm {
  public name: string;
  public severity: AlarmSeverity;
  public triggeredAt: Date;
  public isAcknowledged: boolean = false;
  public items = new Array<AlarmItem>();

  constructor(
    public id: string,
    name: string,
    severity: AlarmSeverity,
    triggeredAt: Date = new Date(),
  ) {
    this.id = id;
    this.name = name;
    this.severity = severity;
    this.triggeredAt = triggeredAt;
  }

  public acknowledge(): void {
    this.isAcknowledged = true;
  }

  public addItem(item: AlarmItem): void {
    this.items.push(item);
  }
}
