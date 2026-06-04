import { AlarmSeverity } from './value-objects/alarm-severity';

export class Alarm {
  public id: string;
  public name: string;
  public severity: AlarmSeverity;

  constructor(id: string, name: string, severity: AlarmSeverity) {
    this.id = id;
    this.name = name;
    this.severity = severity;
  }
}
