import { Module } from '@nestjs/common';
import { AggregateRehydrator } from './application/aggregate-rehydrator';
import { SharedInfrastructureModule } from './infrastructure/shared-infrastructure.module';

@Module({
  imports: [SharedInfrastructureModule],
  exports: [SharedInfrastructureModule, AggregateRehydrator],
  controllers: [],
  providers: [AggregateRehydrator],
})
export class SharedModule {}
