import { Injectable } from '@nestjs/common';
import type { TCreatedPdf } from 'pdfmake';
import { PrinterService } from '../printer/printer.service';
import { PrismaService } from '../prisma.service';
import { getFinalBasicReport } from '../reports';

@Injectable()
export class ExtraReportService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly printerService: PrinterService,
  ) {}
  public getHtmlReport(): TCreatedPdf {
    const docDefinition = getFinalBasicReport({ name: 'John Doe' });
    
    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }
}
