export class CreateAlarmCommand {
  public readonly name: string;
  public readonly severity: string;

  constructor(name: string, severity: string) {
    this.name = name;
    this.severity = severity;
  }
}
