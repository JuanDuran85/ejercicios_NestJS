import fs from 'node:fs';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

const svgContent: string = fs.readFileSync('src/assets/ford.svg', 'utf-8');

export const getBasicChartSvgReport: () => Promise<TDocumentDefinitions> =
  async (): Promise<TDocumentDefinitions> => {
    return {
      content: [
        {
          svg: svgContent,
          width: 100,
          fit: [100, 100],
        },
      ],
    };
  };
