import { Injectable } from '@nestjs/common';
import type { TCreatedPdf } from 'pdfmake';
import { PrinterService } from '../printer/printer.service';
import { PrismaService } from '../prisma.service';
import { orderByIdReport } from '../reports';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable()
export class StoreReportsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly printerService: PrinterService,
  ) {}

  public async getOrderReport(orderId: string): Promise<TCreatedPdf> {
    const docDefinition: TDocumentDefinitions = orderByIdReport();
    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }
}
