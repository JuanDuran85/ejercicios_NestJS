export class CreateAlarmDto {
  name: string;
  severity: string;

  constructor(name: string, severity: string) {
    this.name = name;
    this.severity = severity;
  }
}
