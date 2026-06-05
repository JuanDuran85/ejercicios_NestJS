import { Logger } from '@nestjs/common';
import { Alarm } from '../../../../domain/alarm';
import { AlarmItem } from '../../../../domain/alarm-item';
import { AlarmSeverity } from '../../../../domain/value-objects/alarm-severity';
import { AlarmItemEntity } from '../entities/alarm-item.entity';
import { AlarmEntity } from '../entities/alarm.entity';

export class AlarmMapper {
  private static readonly logger: Logger = new Logger(AlarmMapper.name);
  public static toDomain(alarmEntity: AlarmEntity): Alarm {
    const alarmSeverity: AlarmSeverity = new AlarmSeverity(
      alarmEntity.severity as 'critical' | 'high' | 'medium' | 'low',
    );
    const { id, name, items, isAcknowledged, triggeredAt } = alarmEntity;
    const alarmModel: Alarm = new Alarm(id, name, alarmSeverity);
    alarmModel.isAcknowledged = isAcknowledged;
    alarmModel.triggeredAt = triggeredAt;
    alarmModel.items = items.map(
      (item: AlarmItemEntity) => new AlarmItem(item.id, item.name, item.type),
    );
    this.logger.log(`Alarm mapped to domain: ${JSON.stringify(alarmModel)}`);
    return alarmModel;
  }

  public static toPersistence(alarm: Alarm): AlarmEntity {
    const { id, name, severity, triggeredAt, isAcknowledged, items } = alarm;
    const entity: AlarmEntity = new AlarmEntity(
      id,
      name,
      severity.value,
      triggeredAt,
      isAcknowledged,
      items,
    );
    this.logger.log(`Alarm mapped to persistence: ${JSON.stringify(entity)}`);
    return entity;
  }
}
