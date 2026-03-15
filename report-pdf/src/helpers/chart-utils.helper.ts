import axios from 'axios';
import colorLib from '@kurkle/color';

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
): Promise<string> => {
  const params: URLSearchParams = new URLSearchParams();

  if (options.height) params.append('height', options.height.toString());
  if (options.width) params.append('width', options.width.toString());

  const encodedUri: string = encodeURIComponent(JSON.stringify(chartConfig));

  const chartUrl: string = `https://quickchart.io/chart?c=${encodedUri}&${params.toString()}`;

  const response: axios.AxiosResponse<any, any, {}> = await axios.get(
    chartUrl,
    { responseType: 'arraybuffer' },
  );

  return `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;
};

let _seed = Date.now();

export function srand(seed: any): void {
  _seed = seed;
}

export function rand(min: number = 0, max: number = 0): number {
  _seed = (_seed * 9301 + 49_297) % 233_280;
  return min + (_seed / 233_280) * (max - min);
}

export const CHART_COLORS = [
  '#4dc9f6',
  '#f67019',
  '#f53794',
  '#537bc4',
  '#acc236',
  '#166a8f',
  '#00a950',
  '#727478',
  '#9756cf',
];

export const NAMED_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
};

export function transparentize(value: string, opacity: number): string {
  const alpha: number = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}

export interface NumbersConfig {
  min?: number;
  max?: number;
  count?: number;
  from?: number;
  decimals?: number;
  continuity?: number;
}

export function numbers(config: NumbersConfig = {}): (number | null)[] {
  const cfg: NumbersConfig = config || {};
  const min: number = cfg.min ?? 0;
  const max: number = cfg.max ?? 100;
  const from: number | unknown[] = cfg.from ?? [];
  const count: number = cfg.count ?? 8;
  const decimals: number = cfg.decimals ?? 8;
  const continuity: number = cfg.continuity ?? 1;
  const dfactor: number = 10 ** decimals || 0;
  const data: (number | null)[] = [];
  let i: number;
  let value: number;

  for (i = 0; i < count; ++i) {
    value = (from[i] || 0) + rand(min, max);
    if (rand() <= continuity) {
      data.push(Math.round(dfactor * value) / dfactor);
    } else {
      data.push(null);
    }
  }

  return data;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface MonthsConfig {
  count?: number;
  section?: number;
}

export function months(config: MonthsConfig = {}): string[] {
  const cfg: MonthsConfig = config ?? {};
  const count: number = cfg.count ?? 12;
  const section: number | undefined = cfg.section;
  const values: string[] = [];
  let i: number;
  let value: string;

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }

  return values;
}
