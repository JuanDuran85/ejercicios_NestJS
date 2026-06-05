import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Alarm } from '../alarm';
import { AlarmItem } from '../alarm-item';
import { AlarmSeverity } from '../value-objects/alarm-severity';

@Injectable()
export class AlarmFactory {
  private readonly logger: Logger = new Logger(AlarmFactory.name);
  public create(
    name: string,
    severity: string,
    triggeredAt: Date,
    items: Array<{ name: string; type: string }>,
  ): Alarm {
    const alarmId = randomUUID();
    const alarmSeverity: AlarmSeverity = new AlarmSeverity(
      severity as AlarmSeverity['value'],
    );
    const alarm: Alarm = new Alarm(alarmId, name, alarmSeverity, triggeredAt);

    items
      .map((item) => new AlarmItem(randomUUID(), item.name, item.type))
      .forEach((item: AlarmItem) => alarm.addItem(item));
    
    this.logger.log(`Alarm created: ${JSON.stringify(alarm)}`);
    return alarm;
  }
}
