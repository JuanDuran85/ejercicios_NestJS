import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Alarm } from '../../domain/alarm';
import { AlarmFactory } from '../../domain/factories/alarm.factory';
import { CreateAlarmCommand } from './create-alarm.command';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler implements ICommandHandler<CreateAlarmCommand> {
  private readonly logger: Logger = new Logger(CreateAlarmCommandHandler.name);

  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly alarmFactory: AlarmFactory,
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
    this.eventPublisher.mergeObjectContext(alarm);
    alarm.commit();
    return alarm;
  }
}
