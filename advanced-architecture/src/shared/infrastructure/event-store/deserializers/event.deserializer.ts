import { Injectable, Type } from '@nestjs/common';
import { AlarmCreatedEvent } from '../../../../alarms/domain/events/alarm-created.event';
import { SerializableEvent } from '../../../domain/interfaces/serializable-event';
import { Event } from '../schemas/event.schema';

@Injectable()
export class EventDeserializer {
  public deserialize<T>(event: Event): SerializableEvent<T> {
    const eventCls: typeof AlarmCreatedEvent | undefined =
      this.getEventClassByType(event.type);
    return {
      ...event,
      data: this.instantiateSerializedEvent(eventCls!, event.data),
    };
  }

  public getEventClassByType(
    type: string,
  ): typeof AlarmCreatedEvent | undefined {
    // We'll show a more scalable approach later
    switch (type) {
      case AlarmCreatedEvent.name:
        return AlarmCreatedEvent;
    }
  }

  public instantiateSerializedEvent<T extends Type>(
    eventCls: T,
    data: Record<string, any>,
  ) {
    return Object.assign(Object.create(eventCls.prototype), data);
  }
}
