import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getDonutChart } from './charts';

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
  const donutChart: string = await getDonutChart({
    entries: options.topCountries.map((country: TopCountry) => ({
      label: country.country,
      value: country.customers,
    })),
    position: 'left',
  });

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        image: donutChart,
        width: 500,
      },
    ],
  };
  return docDefinition;
};
