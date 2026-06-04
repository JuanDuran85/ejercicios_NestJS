import { Injectable, Logger } from '@nestjs/common';
import { Alarm } from '../domain/alarm';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { AlarmRepository } from './ports/alarm.repository';

@Injectable()
export class AlarmsService {
  private readonly logger: Logger = new Logger(AlarmsService.name);

  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
  ) {}

  public create(createAlarmDto: CreateAlarmCommand): Promise<Alarm> {
    const alarmCreated: Alarm = this.alarmFactory.create(
      createAlarmDto.name,
      createAlarmDto.severity,
    );
    this.logger.log(`Alarm created: ${JSON.stringify(alarmCreated)}`);

    return this.alarmRepository.save(alarmCreated);
  }
  public findAll() {
    return this.alarmRepository.findAll();
  }
}
