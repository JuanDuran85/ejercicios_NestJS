import { Injectable } from '@nestjs/common';
import pdfmake from 'pdfmake/';
import type { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';
import { PrismaService } from '../prisma.service';
@Injectable()
export class BasicReportsService {
  private readonly fonts: TFontDictionary = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Bold.ttf',
      italics: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-BoldItalic.ttf',
    },
  };

  constructor(private readonly prisma: PrismaService) {}
  public getBasicReport(): pdfmake.TCreatedPdf {
    pdfmake.setFonts(this.fonts);
    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: 'This is a header ONE', style: 'header' },
        'No styling here, this is a standard paragraph TWO',
        { text: 'Another text THREE', style: 'anotherStyle' },
        {
          text: 'Multiple styles applied FOUR',
          style: ['header', 'anotherStyle'],
        },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
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
    return pdfmake.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }
}
