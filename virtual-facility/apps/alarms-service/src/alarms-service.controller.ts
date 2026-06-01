import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AlarmsServiceController {
  private readonly logger: Logger = new Logger('Alarms Service Controller');

  @EventPattern('alarm.created')
  public create(@Payload() data: unknown) {
    this.logger.debug(
      `Received new "alarm.created" event with data: ${JSON.stringify(data)}`,
    );
  }
}
