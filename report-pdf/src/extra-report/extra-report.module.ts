import { Module } from '@nestjs/common';
import { ExtraReportService } from './extra-report.service';
import { ExtraReportController } from './extra-report.controller';
import { PrinterModule } from '../printer/printer.module';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ExtraReportController],
  providers: [ExtraReportService, PrismaService],
  exports: [ExtraReportService],
  imports: [PrinterModule],
})
export class ExtraReportModule {}
