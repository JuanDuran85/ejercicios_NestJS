export class NotifyFacilitySupervisorCommand {
  public readonly facilityId: string;
  public readonly alarmIds: string[];

  constructor(facilityId: string, alarmIds: string[]) {
    this.facilityId = facilityId;
    this.alarmIds = alarmIds;
  }
}
