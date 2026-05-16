import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [PaymentsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
