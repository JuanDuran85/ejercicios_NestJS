import * as Utils from '../../helpers/chart-utils.helper';

const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

export const getBarsChart: () => Promise<string> =
  async (): Promise<string> => {
    const labels: string[] = Utils.months({ count: 7 });

    const data = {
      labels,
      datasets: [
        {
          label: 'Fully Rounded',
          data: Utils.numbers(NUMBER_CFG),
          borderColor: Utils.NAMED_COLORS.red,
          backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.red, 0.5),
          borderWidth: 2,
          borderRadius: Number.MAX_VALUE,
          borderSkipped: false,
        },
        {
          label: 'Small Radius',
          data: Utils.numbers(NUMBER_CFG),
          borderColor: Utils.NAMED_COLORS.blue,
          backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.blue, 0.5),
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,
        },
      ],
    };

    const config = {
      type: 'bar',
      data
    };

    return Utils.chartJsToImage(config);
  };
