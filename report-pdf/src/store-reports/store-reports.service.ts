import { Injectable } from '@nestjs/common';
import type { TCreatedPdf } from 'pdfmake';
import { PrinterService } from '../printer/printer.service';
import { PrismaService } from '../prisma.service';
import { getFinalBasicReport } from '../reports';

@Injectable()
export class StoreReportsService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly printerService: PrinterService,
  ) {}

  public async getOrderReport(orderId: string): Promise<TCreatedPdf> {
    const docDefinition = getFinalBasicReport({
      name: orderId.toString(),
    });
    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }
}
