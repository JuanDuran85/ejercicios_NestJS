import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { MESSAGE_BROKER } from './constants';

@Controller()
export class AlarmsServiceController {
  private readonly logger: Logger = new Logger('Alarms Service Controller');

  constructor(
    @Inject(MESSAGE_BROKER) private readonly messageBroker: ClientProxy,
  ) {}
  @EventPattern('alarm.created')
  public async create(@Payload() data: { name: string; buildingId: number }) {
    this.logger.debug(`Received new "alarm.created" event with data: ${JSON.stringify(data)}`)
    this.logger.debug(`Dispatching "alarm.classify" event`);
    
    const alarmClassification = await lastValueFrom(
      this.messageBroker.send('alarm.classify', data),
    );
    this.logger.debug(
      `Alarm "${data.name}" classified as ${alarmClassification.category}`,
    );

    const notify$: Observable<any> = this.messageBroker.emit(
      'notification.send',
      {
        alarm: data,
        category: alarmClassification.category,
      },
    );
    await lastValueFrom(notify$);
    this.logger.debug(`Notification sent for alarm "${data.name}"`);
    this.logger.debug(`Dispatched "notification.send" event`);
  }
}
