import axios from 'axios';

interface ChartOptions {
  height?: number;
  width?: number;
}

export const chartJsToImage: (
  chartConfig: unknown,
  options?: ChartOptions,
) => Promise<string> = async (
  chartConfig: unknown,
  options: ChartOptions = {},
) => {
  const params: URLSearchParams = new URLSearchParams();
  if (options.height) params.append('height', options.height.toString());
  if (options.width) params.append('width', options.width.toString());

  const encodedUri: string = encodeURIComponent(JSON.stringify(chartConfig));
  const chartUrl: string = `https://quickchart.io/chart?c=${encodedUri}&${params.toString()}`;

  const response: axios.AxiosResponse<any, any, {}> = await axios.get(
    chartUrl,
    { responseType: 'arraybuffer' },
  );

  return `data:image/png;base64,${response.data.toString('base64')}`;
};
