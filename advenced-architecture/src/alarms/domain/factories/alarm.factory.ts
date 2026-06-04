import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Alarm } from '../alarm';
import { AlarmSeverity } from '../value-objects/alarm-severity';

@Injectable()
export class AlarmFactory {
  public create(name: string, severity: string): Alarm {
    const alarmId = randomUUID();
    const alarmSeverity: AlarmSeverity = new AlarmSeverity(
      severity as AlarmSeverity['value'],
    );
    return new Alarm(alarmId, name, alarmSeverity);
  }
}
