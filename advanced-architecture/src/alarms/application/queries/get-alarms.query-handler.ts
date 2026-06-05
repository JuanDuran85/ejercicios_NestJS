import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AlarmReadModel } from '../../domain/read-models/alarm.read-model';
import { FindAlarmsRepository } from '../ports/find-alarm.repository';
import { GetAlarmsQuery } from './get-alarms.query';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler implements IQueryHandler<
  GetAlarmsQuery,
  AlarmReadModel[]
> {
  constructor(private readonly alarmRepository: FindAlarmsRepository) {}
  public execute(query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
    return this.alarmRepository.findAll();
  }
}
