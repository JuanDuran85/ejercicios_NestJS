import axios from 'axios';

export const chartJsToImage: (chartConfig: unknown) => Promise<string> = async (
  chartConfig: unknown,
) => {
  const encodedUri: string = encodeURIComponent(JSON.stringify(chartConfig));
  const chartUrl: string = `https://quickchart.io/chart?c=${encodedUri}`;

  const response = await axios.get(chartUrl, { responseType: 'arraybuffer' });

  return `data:image/png;base64,${response.data.toString('base64')}`;
};
