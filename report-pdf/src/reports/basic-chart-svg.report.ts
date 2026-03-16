import fs from 'node:fs';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as Utils from '../helpers/chart-utils.helper';

const svgContent: string = fs.readFileSync('src/assets/ford.svg', 'utf-8');

const generateChartImage: () => Promise<string> = async () => {
  const chartConfig = {
    type: 'bar', // Show a bar chart
    data: {
      labels: [2012, 2013, 2014, 2015, 2016], // Set X-axis labels
      datasets: [
        {
          label: 'Users', // Create the 'Users' dataset
          data: [120, 60, 50, 180, 120], // Add data to the chart
        },
      ],
    },
  };

  return Utils.chartJsToImage(chartConfig);
};

const generateDoughnutChartImage: () => Promise<string> = async () => {
  const DATA_COUNT = 5;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  const chartConfig = {
    type: 'doughnut',
    data,
    options: {
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart',
      },
    },
  };

  return Utils.chartJsToImage(chartConfig);
};

export const getBasicChartSvgReport: () => Promise<TDocumentDefinitions> =
  async (): Promise<TDocumentDefinitions> => {
    const [chart, chartDoughnut] = await Promise.all([
      generateChartImage(),
      generateDoughnutChartImage(),
    ]);

    return {
      content: [
        {
          svg: svgContent,
          width: 100,
          fit: [100, 100],
        },
        {
          image: chart,
          width: 500,
          height: 300,
          fit: [500, 300],
        },
        {
          image: chartDoughnut,
          width: 500,
          height: 300,
          fit: [500, 300],
        },
      ],
    };
  };
