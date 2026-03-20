import { Injectable } from '@nestjs/common';
import type { TCreatedPdf, TDocumentDefinitions } from 'pdfmake';
import { PrinterService } from '../printer/printer.service';
import { PrismaService } from '../prisma.service';
import { getFinalBasicReport, headerSection } from '../reports';
import fs from 'node:fs';
import { getHtmlContent } from 'src/helpers';

@Injectable()
export class ExtraReportService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly printerService: PrinterService,
  ) {}
  public getHtmlReport(): TCreatedPdf {
    const htmlFile: string = fs.readFileSync('src/reports/html/basic-01.html', 'utf8');
    const content: Content = getHtmlContent();

    const docDefinition: TDocumentDefinitions = {
      header: headerSection({
        title: 'HTML to Pdf',
        subtitle: 'HTML to PDF Converter'
      }),
      content
    }

    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }
}
