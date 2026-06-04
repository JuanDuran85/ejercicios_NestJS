export class AlarmSeverity {
  constructor(public readonly value: 'critical' | 'high' | 'medium' | 'low') {
    this.value = value;
  }

  public equals(severity: AlarmSeverity): boolean {
    return this.value === severity.value;
  }
}
