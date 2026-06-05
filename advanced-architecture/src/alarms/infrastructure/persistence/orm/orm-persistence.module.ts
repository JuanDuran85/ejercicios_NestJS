import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateAlarmsRepository } from '../../../application/ports/create-alarm.repository';
import { AlarmItemEntity } from './entities/alarm-item-entity';
import { AlarmEntity } from './entities/alarm.entity';
import { OrmAlarmRepository } from './repositories/alarm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity])],
  controllers: [],
  providers: [
    {
      provide: CreateAlarmsRepository,
      useClass: OrmAlarmRepository,
    },
  ],
  exports: [CreateAlarmsRepository],
})
export class OrmAlarmPersistenceModule {}
