import { Module } from '@nestjs/common';
import { IntervalScheduler } from './interval.scheduler/interval.scheduler';
import { DiscoveryModule } from '@nestjs/core';

@Module({
    providers: [IntervalScheduler],
    exports: [],
    imports: [DiscoveryModule],
    controllers: [],
})
export class SchedulerModule {}
