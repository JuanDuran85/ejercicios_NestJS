import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { countries as Country} from '../generated/prisma/client';

interface ReportOptions {
  countries: Country[];
  title?: string;
  subtitle?: string;
}
export const getCountryReport: (options: ReportOptions) => TDocumentDefinitions = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const {subtitle, title, countries} = options;

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
    ],
  };
};
