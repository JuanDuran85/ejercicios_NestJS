import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getFinalBasicReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    content: [
      { text: 'This is a header 1', style: 'header' },
      'No styling here, this is a standard paragraph 2',
      { text: 'Another text 3', style: 'anotherStyle' },
      {
        text: 'Multiple styles applied 4',
        style: ['header', 'anotherStyle'],
      },
    ],
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
      title: 'My Report',
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
