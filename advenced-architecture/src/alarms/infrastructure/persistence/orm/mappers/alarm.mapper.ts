import { Logger } from '@nestjs/common';
import { Alarm } from '../../../../domain/alarm';
import { AlarmSeverity } from '../../../../domain/value-objects/alarm-severity';
import { AlarmEntity } from '../entities/alarm.entity';

export class AlarmMapper {
  private static readonly logger: Logger = new Logger(AlarmMapper.name);
  public static toDomain(alarmEntity: AlarmEntity): Alarm {
    const alarmSeverity: AlarmSeverity = new AlarmSeverity(
      alarmEntity.severity as 'critical' | 'high' | 'medium' | 'low',
    );
    const { id, name } = alarmEntity;
    const alarmModel: Alarm = new Alarm(id, name, alarmSeverity);
    this.logger.log(`Alarm mapped to domain: ${JSON.stringify(alarmModel)}`);
    return alarmModel;
  }

  public static toPersistence(alarm: Alarm): AlarmEntity {
    const { id, name, severity } = alarm;
    const entity: AlarmEntity = new AlarmEntity(id, name, severity.value);
    this.logger.log(`Alarm mapped to persistence: ${JSON.stringify(entity)}`);
    return entity;
  }
}
