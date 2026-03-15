import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as Utils from '../helpers/chart-utils.helper';

interface TopCountry {
  country: string;
  customers: number;
}
interface ReportOptions {
  topCountries: TopCountry[];
  title?: string;
  subtitle?: string;
}

const generateTopCountryDonut: (
  topCountries: TopCountry[],
) => Promise<string> = async (topCountries: TopCountry[]): Promise<string> => {
  const data = {
    labels: topCountries.map((country) => country.country),
    datasets: [
      {
        label: 'Dataset 1',
        data: topCountries.map((country) => country.customers),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data,
    options: {
      legend: {
        position: 'left',
      },
      plugins: {
        datalabels: {
          color: 'white',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
    },
  };

  return Utils.chartJsToImage(config);
};

export const getStatisticsReport: (
  options: ReportOptions,
) => Promise<TDocumentDefinitions> = async (
  options: ReportOptions,
): Promise<TDocumentDefinitions> => {
  const donutChart: string = await generateTopCountryDonut(
    options.topCountries,
  );

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
