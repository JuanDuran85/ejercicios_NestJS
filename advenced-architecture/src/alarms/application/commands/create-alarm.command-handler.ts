import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AlarmFactory } from '../../domain/factories/alarm.factory';
import { AlarmRepository } from '../ports/alarm.repository';
import { CreateAlarmCommand } from './create-alarm.command';
import { Alarm } from '../../domain/alarm';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler implements ICommandHandler<CreateAlarmCommand> {
  private readonly logger: Logger = new Logger(CreateAlarmCommandHandler.name);

  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
  ) {}

  public async execute(command: CreateAlarmCommand): Promise<any> {
    this.logger.debug(`Creating alarm "${command.name}"`);
    this.logger.log(
      `Processing "CreateAlarmCommand: ${JSON.stringify(command)} `,
    );
    const alarm: Alarm = this.alarmFactory.create(
      command.name,
      command.severity,
    );
    return this.alarmRepository.save(alarm);
  }
}
