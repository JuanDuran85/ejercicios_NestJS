import { Type } from '@nestjs/common';
import { PolicyHandler } from './interfaces/policy-handler.interface';
import { Policy } from './interfaces/policy.interface';

export class PolicyHandlerStorage {
  private readonly collection: Map<Type<Policy>, PolicyHandler<any>> = new Map<
    Type<Policy>,
    PolicyHandler<any>
  >();

  public add<T extends Policy>(
    policyCls: Type<T>,
    handler: PolicyHandler<any>,
  ): void {
    this.collection.set(policyCls, handler);
  }

  public get<T extends Policy>(policyCls: Type<T>): PolicyHandler<any> {
    const handler: PolicyHandler<any> | undefined =
      this.collection.get(policyCls);
    if (!handler)
      throw new Error(
        `"${policyCls.name}" does not have the associated handler.`,
      );
    return handler;
  }

  public has(policyCls: Type<Policy>): boolean {
    return this.collection.has(policyCls);
  }
}
