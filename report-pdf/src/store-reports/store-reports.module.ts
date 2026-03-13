import { Module } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { PrismaService } from '../prisma.service';
import { StoreReportsController } from './store-reports.controller';
import { StoreReportsService } from './store-reports.service';

@Module({
  controllers: [StoreReportsController],
  providers: [StoreReportsService, PrismaService, PrinterService],
  exports: [],
  imports: [],
})
export class StoreReportsModule {}
