import { Module } from '@nestjs/common';
import { PrinterModule } from '../printer/printer.module';
import { PrismaService } from '../prisma.service';
import { BasicReportsController } from './basic-reports.controller';
import { BasicReportsService } from './basic-reports.service';

@Module({
  controllers: [BasicReportsController],
  providers: [BasicReportsService, PrismaService],
  imports: [PrinterModule],
  exports: [],
})
export class BasicReportsModule {}
