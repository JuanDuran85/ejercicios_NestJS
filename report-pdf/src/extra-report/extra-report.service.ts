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
      content: [
        {
          columns: [
            {
              image: 'src/assets/toucan-code-logo.png',
              width: 100,
            },
            {
              alignment: 'center',
              text: 'Forest Admin Community SAP\n RUT: 44.123.1233\n Row Street 1234\n Phone Number: 323.3123.123',
            },
            {
              alignment: 'right',
              width: 140,
              layout: 'borderBlue',
              table: {
                body: [
                  [
                    {
                      layout: 'noBorders',
                      table: {
                        body: [
                          ['No. Order:', '123-45676'],
                          ['Date:', '2026-04-20'],
                          ['Version:', '2026-001'],
                        ],
                      },
                    },
                  ],
                ],
              },
            },
          ],
        },
      ],
    };

    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }
}
