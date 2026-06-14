import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { INTERVAL_HOST_KEY } from '../decorators/interval-host.decorator';
import { INTERVAL_KEY } from '../decorators/interval.decorator';

@Injectable()
export class IntervalScheduler
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly intervals: NodeJS.Timeout[] = [];

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly metadataScanner: MetadataScanner,
  ) {}
  public onApplicationShutdown(signal?: string) {
    this.intervals.forEach((interval: NodeJS.Timeout) =>
      clearInterval(interval),
    );
  }
  public onApplicationBootstrap() {
    const providers: InstanceWrapper<any>[] =
      this.discoveryService.getProviders();
    providers.forEach((provider: InstanceWrapper<any>) => {
      const { instance } = provider;
      const prototype = instance && Object.getPrototypeOf(instance);
      if (!instance || !prototype) return;
      const isIntervalHost =
        this.reflector.get(INTERVAL_HOST_KEY, instance.constructor) ?? false;

      if (!isIntervalHost) return;

      console.debug(provider.name);
      console.debug(provider.token);

      const methodKeys: string[] =
        this.metadataScanner.getAllMethodNames(prototype);

      methodKeys.forEach((methodKey: string) => {
        const interval = this.reflector.get(INTERVAL_KEY, instance[methodKey]);
        if (interval === undefined) return;
        console.debug(interval, methodKey, instance[methodKey]);
        const intervalRef: NodeJS.Timeout = setInterval(
          () => instance[methodKey](),
          interval,
        );
        this.intervals.push(intervalRef);
      });
    });
  }
}
