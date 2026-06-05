import { Alarm } from '../../domain/alarm';

export abstract class CreateAlarmsRepository {
  public abstract save(alarm: Alarm): Promise<Alarm>;
}
