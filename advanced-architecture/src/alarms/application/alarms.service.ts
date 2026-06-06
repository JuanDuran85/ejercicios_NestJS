import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Alarm } from '../domain/alarm';
import { AlarmReadModel } from '../domain/read-models/alarm.read-model';
import { AcknowledgeAlarmCommand } from './commands/acknowledge-alarm.command';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { GetAlarmsQuery } from './queries/get-alarms.query';

@Injectable()
export class AlarmsService {
  private readonly logger: Logger = new Logger(AlarmsService.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public create(createAlarmCommand: CreateAlarmCommand): Promise<Alarm> {
    this.logger.log(
      `Processing "CreateAlarmCommand: ${JSON.stringify(createAlarmCommand)} `,
    );
    return this.commandBus.execute(createAlarmCommand);
  }
  public findAll(): Promise<AlarmReadModel[]> {
    return this.queryBus.execute(new GetAlarmsQuery());
  }

  public acknowledge(id: string): Promise<any> {
    return this.commandBus.execute(new AcknowledgeAlarmCommand(id));
  }
}
