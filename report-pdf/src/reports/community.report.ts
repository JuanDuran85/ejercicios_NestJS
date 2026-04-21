import type { TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportDefinitionsOptions {
  name: string;
}

export const getCommunityReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    content: ['Community report message test'],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
      },
      anotherStyle: {
        italics: true,
        alignment: 'right',
      },
      subheader: {
        fontSize: 15,
        extends: 'header', // or array of strings
      },
    },
    displayTitle: false,
    pageSize: 'LETTER',
    pageOrientation: 'portrait',
    pageMargins: [20, 20, 20, 20],
    info: {
      title: 'Community Report',
      author: 'John Doe',
      subject: 'Report',
      keywords: 'report, pdf',
      creator: 'pdfmake',
      producer: 'pdfmake',
      creationDate: new Date(),
      modDate: new Date(),
    },
  };

  return docDefinition;
};
