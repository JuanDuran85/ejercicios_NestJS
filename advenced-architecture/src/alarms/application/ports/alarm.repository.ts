import { Alarm } from '../../domain/alarm';

export abstract class AlarmRepository {
  public abstract findAll(): Promise<Alarm[]>;
  public abstract save(alarm: Alarm): Promise<Alarm>;
}
