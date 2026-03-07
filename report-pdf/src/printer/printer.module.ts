import { Module } from '@nestjs/common';
import { PrinterService } from './printer.service';

@Module({
  providers: [PrinterService],
  exports: [PrinterService],
  controllers: [],
  imports: [],
})
export class PrinterModule {}
