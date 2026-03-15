import fs from 'node:fs';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { chartJsToImage } from '../helpers';

const svgContent: string = fs.readFileSync('src/assets/ford.svg', 'utf-8');

const generateChartImage = async () => {
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

  return chartJsToImage(chartConfig);
};
export const getBasicChartSvgReport: () => Promise<TDocumentDefinitions> =
  async (): Promise<TDocumentDefinitions> => {

    const chart = await generateChartImage();

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
            fit: [500, 300]
        }
      ],
    };
  };
