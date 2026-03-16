import * as Utils from '../../helpers/chart-utils.helper';

export const getLineChart: () => Promise<string> = async (): Promise<string> => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        label: 'Inventory Movement',
        data: Utils.numbers({ count: 6, min: -100, max: 100 }),
        borderColor: Utils.CHART_COLORS[2],
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS[4], 0.5),
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 5,
      },
    ],
  };

  const config = {
    type: 'line',
    data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: (ctx) =>
            `Point Style: ${ctx.chart.data.datasets[0].pointStyle}`,
        },
      },
    },
  };

  return Utils.chartJsToImage(config, {
    width: 500,
    height: 200,
  });
};
