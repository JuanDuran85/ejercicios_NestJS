import type { TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportOptions {}

export const getStatisticsReport: (
  options: ReportOptions,
) => TDocumentDefinitions = (options: ReportOptions): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    content: ['Statistics Report'],
  };
  return docDefinition;
};
