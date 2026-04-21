import { Injectable } from '@nestjs/common';
import fs from 'node:fs';
import type { Content, TCreatedPdf } from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHtmlContent } from 'src/helpers';
import { PrinterService } from '../printer/printer.service';
import { PrismaService } from '../prisma.service';
import { FooterSection, headerSection } from '../reports';

@Injectable()
export class ExtraReportService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly printerService: PrinterService,
  ) {}
  public getHtmlReport(): TCreatedPdf {
    const htmlFile: string = fs.readFileSync(
      'src/reports/html/basic-03.html',
      'utf8',
    );
    const content: Content = getHtmlContent(htmlFile, {
      client: 'Client name',
      title: 'My title',
    });

    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 120, 40, 60],
      header: headerSection({
        title: 'HTML to Pdf',
        subtitle: 'HTML to PDF Converter',
      }),
      footer: FooterSection,
      content,
    };

    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }

  public getCommunityReport(): TCreatedPdf {
    

    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 120, 40, 60],
      header: headerSection({
        title: 'HTML to Pdf',
        subtitle: 'HTML to PDF Converter',
      }),
      footer: FooterSection,
      content,
    };

    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }
}
