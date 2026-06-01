import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AlarmsClassifierServiceController {

  private readonly logger: Logger = new Logger('Alarms Classifier Service');

  @MessagePattern('alarm.classify')
  public classifyAlarm(@Payload() data: unknown) {
    this.logger.debug(`Received new "alarm.classify" event with data: ${JSON.stringify(data)}`);

    return {
      category: ['critical', 'non-critical', 'invalid'][Math.floor(Math.random() *3)]
    }
  }
}
