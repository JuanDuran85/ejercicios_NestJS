import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { AlarmsController } from '../presenters/http/alarms.controller';
import { AlarmsService } from './alarms.service';
import { AcknowledgeAlarmCommandHandler } from './commands/acknowledge-alarm.command-handler';
import { CreateAlarmCommandHandler } from './commands/create-alarm.command-handler';
import { NotifyFacilitySupervisorCommandHandler } from './commands/notify-facility-supervisor.command-handler';
import { AlarmAcknowledgedEventHandler } from './event-handler/alarm-acknowledged.event-handler';
import { AlarmCreateEventHandler } from './event-handler/alarm-created.event-handler';
import { GetAlarmsQueryHandler } from './queries/get-alarms.query-handler';
import { CascadingAlarmsSaga } from './sagas/cascading-alarms.saga';
import { UnacknowledgedAlarmsSaga } from './sagas/unacknowledged-alarms.saga';

@Module({
  controllers: [AlarmsController],
  providers: [
    AlarmsService,
    AlarmFactory,
    AlarmCreateEventHandler,
    AcknowledgeAlarmCommandHandler,
    AlarmAcknowledgedEventHandler,
    CascadingAlarmsSaga,
    NotifyFacilitySupervisorCommandHandler,
    UnacknowledgedAlarmsSaga,
  ],
})
export class AlarmsModule {
  public static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: AlarmsModule,
      imports: [infrastructureModule],
      providers: [CreateAlarmCommandHandler, GetAlarmsQueryHandler],
      exports: [infrastructureModule],
    };
  }
}
