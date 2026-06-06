import { Body, Controller, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { AlarmsService } from '../../application/alarms.service';
import { CreateAlarmCommand } from '../../application/commands/create-alarm.command';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { AlarmReadModel } from '../../domain/read-models/alarm.read-model';
import { Alarm } from '../../domain/alarm';

@Controller('alarms')
export class AlarmsController {
  private readonly logger: Logger = new Logger(AlarmsController.name);

  constructor(private readonly alarmsService: AlarmsService) {}
  @Post()
  public create(@Body() createAlarmDto: CreateAlarmDto): Promise<Alarm> {
    this.logger.log(`Creating alarm: ${JSON.stringify(createAlarmDto)}`);
    const { items, name, severity, triggeredAt } = createAlarmDto;
    return this.alarmsService.create(
      new CreateAlarmCommand(name, severity, triggeredAt, items),
    );
  }
  @Get()
  public findAll(): Promise<AlarmReadModel[]> {
    return this.alarmsService.findAll();
  }

  @Patch(':id/acknowledge')
  acknowledge(@Param('id') id: string) {
    return this.alarmsService.acknowledge(id);
  }
}
