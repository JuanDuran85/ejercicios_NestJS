import { Query } from '@nestjs/cqrs';
import { AlarmReadModel } from '../../domain/read-models/alarm.read-model';

export class GetAlarmsQuery extends Query<AlarmReadModel[]> {
  constructor() {
    super();
  }
}
