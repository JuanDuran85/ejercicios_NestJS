import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AlarmCreatedEvent } from '../../domain/events/alarm-created.event';

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreateEventHandler implements IEventHandler<AlarmCreatedEvent> {
  private readonly logger: Logger = new Logger(AlarmCreateEventHandler.name);

  public handle(event: any) {
    this.logger.debug(`Alarm created: ${JSON.stringify(event)}`);
  }
}
