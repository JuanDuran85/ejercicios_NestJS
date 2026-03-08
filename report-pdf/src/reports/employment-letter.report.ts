import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportDefinitionsOptions {
  name: string;
}

const styles: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },
  body: {
    margin: [0, 0, 0, 70],
    fontSize: 12,
    alignment: 'justify',
  },
  signature: {
    fontSize: 14,
    bold: true,
    alignment: 'left',
  }
  
};

export const getEmploymentLetterReport = (
  options?: ReportDefinitionsOptions,
): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    styles,
    header: {
        columns: ['1', '2', '3']
    },
    content: [
      { text: 'PROOF OF EMPLOYMENT', style: 'header' },
      {
        text: `I, [Employer Name], in my capacity as [Employer Position] of [Company Name], certify that [Employee Name] has worked for our company since [Employee Start Date]. \n

        During their employment, Mr./Ms. [Employee Name] held the position of [Employee Position], demonstrating responsibility, commitment, and professionalism in the performance of their duties. \n

        Mr./Ms. [Employee Name]'s work schedule is [Number of Hours] hours per week, with a schedule of [Work Schedule], in accordance with the policies and procedures established by the company. \n

        This certificate is issued at the request of the interested party for any purpose they deem appropriate.`,
        style: 'body',
      },
      { text: `Sincerely`, style: 'signature' },
      { text: `[Employer Name]`, style: 'signature' },
      { text: `[Employer Title]`, style: 'signature' },
      { text: `[Company Name]`, style: 'signature' },
      { text: `[Issue Date]`, style: 'signature' },
    ],
  };

  return docDefinition;
};
