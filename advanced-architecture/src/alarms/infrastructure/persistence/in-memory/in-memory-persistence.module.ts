import { Module } from '@nestjs/common';
import { CreateAlarmsRepository } from '../../../application/ports/create-alarm.repository';
import { FindAlarmsRepository } from '../../../application/ports/find-alarm.repository';
import { UpsertMaterializedAlarmRepository } from '../../../application/ports/upsert-materialized-alarm.repository';
import { InMemoryAlarmRepository } from './repositories/alarm.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    InMemoryAlarmRepository,
    {
      provide: CreateAlarmsRepository,
      useClass: InMemoryAlarmRepository,
    },
    {
      provide: FindAlarmsRepository,
      useClass: InMemoryAlarmRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
  ],
  exports: [CreateAlarmsRepository],
})
export class InMemoryAlarmPersistenceModule {}
