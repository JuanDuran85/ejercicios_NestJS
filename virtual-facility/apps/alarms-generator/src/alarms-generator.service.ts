import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Interval } from '@nestjs/schedule';
import { ALARMS_SERVICE } from './constants';

@Injectable()
export class AlarmsGeneratorService {
  private readonly logger = new Logger(AlarmsGeneratorService.name);
  constructor(
    @Inject(ALARMS_SERVICE)
    private readonly alarmServiceClient: ClientProxy,
  ) {}

  @Interval(10_000)
  public generateAlarm() {
    const alarmCreatedEvent = {
      name: `Alarm #${Math.floor(Math.random() * 1000) + 1}`,
      buildingId: Math.floor(Math.random() * 100) + 1,
    };
    this.alarmServiceClient.emit('alarm.created', alarmCreatedEvent);
    this.logger.log(`Alarm created: ${JSON.stringify(alarmCreatedEvent)}`);
  }
}
