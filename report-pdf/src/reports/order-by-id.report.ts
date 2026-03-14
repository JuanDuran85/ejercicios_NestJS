import type {
    Content,
    StyleDictionary,
    TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { DateFormatter } from '../helpers';

const logo: Content = {
  image: 'src/assets/toucan-banner.png',
  width: 100,
  alignment: 'left',
  margin: [10, 30],
  height: 30,
};

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    alignment: 'left',
    margin: [0, 30, 0, 0],
  },
};

export const orderByIdReport = (): TDocumentDefinitions => {
  return {
    styles,
    pageSize: 'LETTER',
    pageOrientation: 'portrait',
    displayTitle: true,
    header: logo,
    pageMargins: [40, 60, 40, 60],
    content: [
      {
        text: 'Toucan Code',
        style: 'header',
      },
      {
        columns: [
          {
            text: '15 Montgomery Str, Suite 100, \nOttawa ON K2Y 9X1, CANADA\nBN: 1278367182\nhttps://devtalles.com',
          },
          {
            text: `Ticket No#: 10255\nDate received: ${DateFormatter.getFormattedDateByDayMonthYear(new Date())}\nPayment by: ${DateFormatter.getFormattedDateByDayMonthYear(new Date())}`,
            alignment: 'right',
          },
        ],
      },
      { qr: 'http://alirafael.com', fit: 75, alignment: 'right' },
    ],
  };
};
