import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AlarmsService } from '../../application/alarms.service';
import { CreateAlarmCommand } from '../../application/commands/create-alarm.command';
import { CreateAlarmDto } from './dto/create-alarm.dto';

@Controller('alarms')
export class AlarmsController {
  private readonly logger: Logger = new Logger(AlarmsController.name);

  constructor(private readonly alarmsService: AlarmsService) {}
  @Post()
  public create(@Body() createAlarmDto: CreateAlarmDto) {
    this.logger.log(`Creating alarm: ${JSON.stringify(createAlarmDto)}`);
    const { items, name, severity, triggeredAt } = createAlarmDto;
    return this.alarmsService.create(
      new CreateAlarmCommand(name, severity, triggeredAt, items),
    );
  }
  @Get()
  public findAll() {
    return this.alarmsService.findAll();
  }
}
