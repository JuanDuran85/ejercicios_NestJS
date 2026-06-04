import { Injectable } from '@nestjs/common';
import { AlarmRepository } from '../../../../application/ports/alarm.repository';
import { Alarm } from '../../../../domain/alarm';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmMapper } from '../mappers/alarm.mapper';

@Injectable()
export class InMemoryAlarmRepository implements AlarmRepository {
  private readonly alarmsMap: Map<string, AlarmEntity> = new Map<
    string,
    AlarmEntity
  >();

  public async findAll(): Promise<Alarm[]> {
    const entities = Array.from(this.alarmsMap.values());
    return entities.map((entity) => AlarmMapper.toDomain(entity));
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
