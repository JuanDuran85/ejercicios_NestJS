export class AlarmReadModel {
  id: string;
  name: string;
  severity: string;
  triggeredAt: Date;
  isAcknowledged: boolean;
  items: Array<{ name: string; type: string }>;

  constructor(
    id: string,
    name: string,
    severity: string,
    triggeredAt: Date,
    isAcknowledged: boolean,
    items: Array<{ name: string; type: string }>,
  ) {
    this.id = id;
    this.name = name;
    this.severity = severity;
    this.triggeredAt = triggeredAt;
    this.isAcknowledged = isAcknowledged;
    this.items = items;
  }
}
