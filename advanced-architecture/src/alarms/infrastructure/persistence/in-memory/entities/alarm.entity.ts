export class AlarmEntity {
  id: string;

  name: string;

  severity: string;

  constructor(id: string, name: string, severity: string) {
    this.id = id;
    this.name = name;
    this.severity = severity;
  }
}
