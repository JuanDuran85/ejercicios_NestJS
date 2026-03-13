import type { PageSize, TDocumentDefinitions } from 'pdfmake/interfaces';
import { countries as Country } from '../generated/prisma/client';
import { FooterSection, headerSection } from './sections';

interface ReportOptions {
  countries: Country[];
  title?: string;
  subtitle?: string;
}
export const getCountryReport: (
  options: ReportOptions,
) => TDocumentDefinitions = (options: ReportOptions): TDocumentDefinitions => {
  const { countries } = options;

  return {
    pageOrientation: 'landscape',
    pageSize: 'LETTER',
    displayTitle: true,
    header: headerSection({
      title: 'Countries Report',
      showLogo: true,
      showDate: true,
      subtitle: 'List of countries',
    }),
    footer: (currentPage: number, pageCount: number, pageSize: PageSize) =>
      FooterSection(currentPage, pageCount, pageSize),
    pageMargins: [40, 110, 40, 60],
    content: [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],
          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            ...countries.map((country) => [
              country.id.toString(),
              country.iso2,
              country.iso3 ?? '',
              { text: country.name ?? '', bold: true },
              country.continent ?? '',
              country.local_name ?? '',
            ]),
          ],
        },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Total Countries',
                colSpan: 3,
                bold: true,
              },
              {},
              {},
              {
                text: countries.length.toString(),
                bold: true,
                italics: true,
              },
              {},
              {},
            ],
          ],
        },
      },
    ],
  };
};
