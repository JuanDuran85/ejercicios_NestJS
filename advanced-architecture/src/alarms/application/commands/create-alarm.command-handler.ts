import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Alarm } from '../../domain/alarm';
import { AlarmCreatedEvent } from '../../domain/events/alarm-created.event';
import { AlarmFactory } from '../../domain/factories/alarm.factory';
import { CreateAlarmsRepository } from '../ports/create-alarm.repository';
import { CreateAlarmCommand } from './create-alarm.command';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler implements ICommandHandler<CreateAlarmCommand> {
  private readonly logger: Logger = new Logger(CreateAlarmCommandHandler.name);

  constructor(
    private readonly alarmRepository: CreateAlarmsRepository,
    private readonly alarmFactory: AlarmFactory,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: CreateAlarmCommand): Promise<Alarm> {
    this.logger.debug(`Creating alarm "${command.name}"`);
    this.logger.log(
      `Processing "CreateAlarmCommand: ${JSON.stringify(command)} `,
    );

    const { items, name, severity, triggeredAt } = command;
    const alarm: Alarm = this.alarmFactory.create(
      name,
      severity,
      triggeredAt,
      items,
    );
    const newAlarm: Alarm = await this.alarmRepository.save(alarm);
    this.eventBus.publish(new AlarmCreatedEvent(newAlarm));
    return newAlarm;
  }
}
