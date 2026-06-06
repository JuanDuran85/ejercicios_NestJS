import { AggregateRoot } from '@nestjs/cqrs';
import { Version } from './value-objects/version';

const VERSION = Symbol('version');

export class VersionedAggregateRoot extends AggregateRoot {
  public id: string;

  private [VERSION] = new Version(0);

  constructor(id: string) {
    super();
    this.id = id;
  }

  get version(): Version {
    return this[VERSION];
  }

  private setVersion(version: Version): void {
    this[VERSION] = version;
  }
}
