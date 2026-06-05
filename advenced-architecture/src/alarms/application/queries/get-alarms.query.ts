import { Query } from '@nestjs/cqrs';
import { Alarm } from '../../domain/alarm';

export class GetAlarmsQuery extends Query<Alarm[]> {
  constructor() {
    super();
  }
}
