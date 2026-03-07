import { Injectable } from '@nestjs/common';
import pdfmake from 'pdfmake/';
import type {
  BufferOptions,
  TDocumentDefinitions,
  TFontDictionary,
} from 'pdfmake/interfaces';

@Injectable()
export class PrinterService {
  private readonly fonts: TFontDictionary = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Bold.ttf',
      italics: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-BoldItalic.ttf',
    },
  };

  constructor() {
    this.setFonts();
  }

  public createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {},
  ): pdfmake.TCreatedPdf {
    return pdfmake.createPdf(docDefinition, options);
  }

  private setFonts(): void {
    pdfmake.setFonts(this.fonts);
  }
}
