import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SerializedEventPayload } from '../../../shared/domain/interfaces/serializable-event';
import { AlarmAcknowledgedEvent } from '../../domain/events/alarm-acknowledged.event';
import { UpsertMaterializedAlarmRepository } from '../ports/upsert-materialized-alarm.repository';

@EventsHandler(AlarmAcknowledgedEvent)
export class AlarmAcknowledgedEventHandler implements IEventHandler<
  SerializedEventPayload<AlarmAcknowledgedEvent>
> {
  private readonly logger: Logger = new Logger(
    AlarmAcknowledgedEventHandler.name,
  );

  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
  ) {}

  public async handle(
    event: SerializedEventPayload<AlarmAcknowledgedEvent>,
  ): Promise<void> {
    this.logger.log(`Alarm acknowledged event: ${JSON.stringify(event)}`);
    await this.upsertMaterializedAlarmRepository.upsert({
      id: event.alarmId,
      isAcknowledged: true,
    });
  }
}
