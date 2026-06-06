import { VersionedAggregateRoot } from '../../shared/domain/aggregate-root';
import { AlarmItem } from './alarm-item';
import { AlarmSeverity } from './value-objects/alarm-severity';

export class Alarm extends VersionedAggregateRoot {
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
    super(id);
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
