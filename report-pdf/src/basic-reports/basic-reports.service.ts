import { Injectable } from '@nestjs/common';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BasicReportsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly printerService: PrinterService,
  ) {}
  public getBasicReport() {
    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: 'This is a header 1', style: 'header' },
        'No styling here, this is a standard paragraph 2',
        { text: 'Another text 3', style: 'anotherStyle' },
        {
          text: 'Multiple styles applied 4',
          style: ['header', 'anotherStyle'],
        },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          background: 'blue',
          color: 'white',
          alignment: 'center',
        },
        anotherStyle: {
          italics: true,
          alignment: 'right',
        },
        subheader: {
          fontSize: 15,
          extends: 'header', // or array of strings
        },
      },
      displayTitle: false,
      pageSize: 'LETTER',
      pageOrientation: 'portrait',
      pageMargins: [20, 20, 20, 20],
      info: {
        title: 'My Report',
        author: 'John Doe',
        subject: 'Report',
        keywords: 'report, pdf',
        creator: 'pdfmake',
        producer: 'pdfmake',
        creationDate: new Date(),
        modDate: new Date(),
      },
    };
    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }
}
