import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getDonutChart, getLineChart } from './charts';
import { headerSection } from './sections';

interface TopCountry {
  country: string;
  customers: number;
}
interface ReportOptions {
  topCountries: TopCountry[];
  title?: string;
  subtitle?: string;
}

export const getStatisticsReport: (
  options: ReportOptions,
) => Promise<TDocumentDefinitions> = async (
  options: ReportOptions,
): Promise<TDocumentDefinitions> => {
  const [donutChart, lineChart] = await Promise.all([
    getDonutChart({
      entries: options.topCountries.map((country: TopCountry) => ({
        label: country.country,
        value: country.customers,
      })),
      position: 'left',
    }),
    getLineChart(),
  ]);

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 100, 40, 60],
    pageSize: 'LETTER',
    pageOrientation: 'portrait',
    displayTitle: true,
    header: headerSection({
      title: options.title ?? 'Customers Statistics',
      subtitle: options.subtitle ?? 'Top 10 countries with the most customers',
    }),
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: 'Top 10 Countries with the Most Customers',
                alignment: 'center',
                margin: [0, 0, 0, 10],
                style: {
                  fontSize: 16,
                  bold: true,
                },
              },
              {
                image: donutChart,
                width: 350,
              },
            ],
          },
          {
            layout: 'lightHorizontalLines',
            width: 'auto',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [
                ['Country', 'Customers'],
                ...options.topCountries.map((nation: TopCountry) => [
                  nation.country,
                  nation.customers,
                ]),
              ],
            },
          },
        ],
      },
      {
        image: lineChart,
        width: 500,
        margin: [0, 30],
      },
    ],
  };
  return docDefinition;
};
