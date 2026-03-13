import { Injectable } from '@nestjs/common';
import pdfmake from 'pdfmake/';
import type {
  BufferOptions,
  ContentTable,
  CustomTableLayout,
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
    pdfmake.addTableLayouts(this.getCustomTableLayouts());
    return pdfmake.createPdf(docDefinition, options);
  }

  private setFonts(): void {
    pdfmake.setFonts(this.fonts);
  }

  private getCustomTableLayouts(): Record<string, CustomTableLayout> {
    return {
      customLayout01: {
        hLineWidth(i: number, node: ContentTable) {
          if (i === 0 || i === node.table.body.length) {
            return 0;
          }
          return i === node.table.headerRows ? 2 : 1;
        },
        vLineWidth(i: number) {
          return 0;
        },
        hLineColor(i: number) {
          return i === 1 ? 'black' : '#bbbbbb';
        },
        paddingLeft(i: number) {
          return i === 0 ? 0 : 8;
        },
        paddingRight(i: number, node: ContentTable) {
          return i === node.table.widths!.length - 1 ? 0 : 8;
        },
        fillColor(i: number, node: ContentTable) {
          if (i === 0 || i === node.table.body.length) {
            return '#a0c3ee';
          }

          if(i === node.table.body.length - 1){
            return '#a0c3ee';
          }
          return i % 2 ? '#f4f4f4' : '#ffffff';
        },
      },
    };
  }
}
