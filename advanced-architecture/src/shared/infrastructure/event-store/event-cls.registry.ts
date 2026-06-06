import { Type } from '@nestjs/common';

export class EventClsRegistry {
  private static readonly eventClsMap = new Map<string, any>();

  public static add(eventCls: Type): void {
    this.eventClsMap.set(eventCls.name, eventCls);
  }

  public static get(eventClsName: string): Type {
    const eventCls = this.eventClsMap.get(eventClsName);
    if (!eventCls) {
      throw new Error(`Event class "${eventClsName}" not registered`);
    }
    return eventCls;
  }
}
