import * as Utils from '../../helpers/chart-utils.helper';

interface DonutEntry {
  label: string;
  value: number;
}

interface DonutOptions {
  entries: DonutEntry[];
  position?: 'left' | 'right' | 'top' | 'bottom';
}

export const getDonutChart: (options: DonutOptions) => Promise<string> = async (
  options: DonutOptions,
): Promise<string> => {
    const {position = 'top'} = options;
  const data = {
    labels: options.entries.map((entry: DonutEntry) => entry.label),
    datasets: [
      {
        label: 'Dataset 1',
        data: options.entries.map((entry: DonutEntry) => entry.value),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data,
    options: {
      legend: {
        position: position,
      },
      plugins: {
        datalabels: {
          color: 'white',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };

  return Utils.chartJsToImage(config);
};
