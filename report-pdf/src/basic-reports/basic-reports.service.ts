import { Injectable } from '@nestjs/common';
import type { TCreatedPdf, TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from '../printer/printer.service';
import { PrismaService } from '../prisma.service';
import { getEmploymentLetterReport, getFinalBasicReport } from '../reports';

@Injectable()
export class BasicReportsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly printerService: PrinterService,
  ) {}
  public getBasicReport(): TCreatedPdf {
    const docDefinition = getFinalBasicReport({ name: 'John Doe' });
    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }

  public getEmploymentLetter(): TCreatedPdf {
    const docDefinition: TDocumentDefinitions = getEmploymentLetterReport();
    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }
}
