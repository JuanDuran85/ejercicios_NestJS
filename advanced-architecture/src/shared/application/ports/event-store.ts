import { SerializableEvent } from '../../domain/interfaces/serializable-event';

export abstract class EventStore {
  public abstract persist(
    eventOrEvents: SerializableEvent | SerializableEvent[],
  ): Promise<void>;
  public abstract getEventsByStreamId(streamId: string): Promise<SerializableEvent[]>;
}
