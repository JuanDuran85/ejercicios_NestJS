import type { PageSize, TDocumentDefinitions } from 'pdfmake/interfaces';
import { getBarsChart, getDonutChart, getLineChart } from './charts';
import { FooterSection, headerSection } from './sections';

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
  const [donutChart, lineChart, barChar01, barChar02] = await Promise.all([
    getDonutChart({
      entries: options.topCountries.map((country: TopCountry) => ({
        label: country.country,
        value: country.customers,
      })),
      position: 'left',
    }),
    getLineChart(),
    getBarsChart(),
    getBarsChart(),
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
    footer: (currentPage: number, pageCount: number, pageSize: PageSize) =>
          FooterSection(currentPage, pageCount, pageSize),
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
                  fontSize: 14,
                  bold: true,
                },
              },
              {
                image: donutChart,
                width: 300,
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
        margin: [0, 20],
      },
      {
        columnGap: 10,
        columns: [
          {
            image: barChar01,
            width: 250,
          },
          {
            image: barChar02,
            width: 250
          },
        ],
      },
    ],
  };
  return docDefinition;
};
