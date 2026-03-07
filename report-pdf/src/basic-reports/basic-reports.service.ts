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
      content: ['Second pdf document using pdfmake'],
    };
    return pdfmake.createPdf(docDefinition);
  }
}
