import { Type } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

export function WithUuid<TBase extends Type>(Base: TBase) {
  return class extends Base {
    uuid = randomUUID();

    public regenerateUuid(): void {
      this.uuid = randomUUID();
    }
  };
}
