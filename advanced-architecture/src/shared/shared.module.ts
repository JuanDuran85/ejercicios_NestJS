import { Module } from '@nestjs/common';
import { SharedInfrastructureModule } from './infrastructure/shared-infrastructure.module';

@Module({
  imports: [SharedInfrastructureModule],
  exports: [SharedInfrastructureModule],
  controllers: [],
  providers: [],
})
export class SharedModule {}
