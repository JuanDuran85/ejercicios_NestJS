import { Injectable } from '@nestjs/common';
import { CreateAlarmsRepository } from '../../../../application/ports/create-alarm.repository';
import { FindAlarmsRepository } from '../../../../application/ports/find-alarm.repository';
import { UpsertMaterializedAlarmRepository } from '../../../../application/ports/upsert-materialized-alarm.repository';
import { Alarm } from '../../../../domain/alarm';
import { AlarmReadModel } from '../../../../domain/read-models/alarm.read-model';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmMapper } from '../mappers/alarm.mapper';

@Injectable()
export class InMemoryAlarmRepository
  implements
    CreateAlarmsRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository
{
  private readonly alarmsMap: Map<string, AlarmEntity> = new Map<
    string,
    AlarmEntity
  >();
  private readonly materializedAlarmsViews = new Map<string, AlarmReadModel>();

  public async upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    if (this.materializedAlarmsViews.has(alarm.id)) {
      this.materializedAlarmsViews.set(alarm.id, {
        ...this.materializedAlarmsViews.get(alarm.id)!,
        ...alarm,
      });
    }
    this.materializedAlarmsViews.set(alarm.id, alarm as AlarmReadModel);
  }

  public async findAll(): Promise<AlarmReadModel[]> {
    return Array.from(this.materializedAlarmsViews.values());
  }

  public async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel: AlarmEntity = AlarmMapper.toPersistence(alarm);
    this.alarmsMap.set(persistenceModel.id, persistenceModel);
    const newEntity: AlarmEntity | undefined = this.alarmsMap.get(
      persistenceModel.id,
    );
    if (!newEntity) {
      throw new Error('Alarm not found');
    }
    return AlarmMapper.toDomain(newEntity);
  }
}
