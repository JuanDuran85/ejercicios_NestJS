export class CreateAlarmCommand {
  public readonly name: string;
  public readonly severity: string;
  public readonly triggeredAt: Date;
  public readonly items: Array<{ name: string; type: string }>;

  constructor(
    name: string,
    severity: string,
    triggeredAt: Date,
    items: Array<{ name: string; type: string }>,
  ) {
    this.name = name;
    this.severity = severity;
    this.triggeredAt = triggeredAt;
    this.items = items;
  }
}
