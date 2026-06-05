import { AlarmReadModel } from '../../domain/read-models/alarm.read-model';

export abstract class FindAlarmsRepository {
  public abstract findAll(): Promise<AlarmReadModel[]>;
}
