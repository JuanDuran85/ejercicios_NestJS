import type {
  Content,
  PageSize,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormatterHelper, DateFormatter } from '../helpers';
import { FooterSection } from './sections';


interface ReportValues {
  title: string;
}


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
  subheader: {
    fontSize: 16,
    bold: true,
    alignment: 'left',
    margin: [0, 10, 0, 0],
  },
};

export const orderByIdReport: () => TDocumentDefinitions =
  (): TDocumentDefinitions => {
    return {
      styles,
      pageSize: 'LETTER',
      pageOrientation: 'portrait',
      displayTitle: true,
      header: logo,
      pageMargins: [40, 60, 40, 60],
      footer: (currentPage: number, pageCount: number, pageSize: PageSize) =>
        FooterSection(currentPage, pageCount, pageSize),
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
              text: [
                {
                  text: 'Ticket No#: 10255\n',
                  bold: true,
                  style: {
                    fontSize: 12,
                  },
                },
                `Date received: ${DateFormatter.getFormattedDateByDayMonthYear(new Date())}\nPayment by: ${DateFormatter.getFormattedDateByDayMonthYear(new Date())}`,
              ],
              alignment: 'right',
            },
          ],
        },
        { qr: 'http://alirafael.com', fit: 75, alignment: 'right' },
        {
          text: [
            {
              text: 'OrderCharge to: \n\n',
              bold: true,
              style: 'subheader',
            },
            `Company name: Richter Supermarket Michael Holz 
          Grenzacherweg 237`,
          ],
        },
        {
          layout: 'headerLineOnly',
          margin: [0, 20],
          table: {
            headerRows: 1,
            widths: [50, '*', 'auto', 'auto', 'auto'],
            body: [
              ['ID', 'Description', 'Quantity', 'Unit Price', 'Total Price'],
              [
                '1',
                'Product 1',
                '2',
                '$10.00',
                {
                  text: CurrencyFormatterHelper.formatCurrency(630),
                  alignment: 'right',
                },
              ],
              [
                '2',
                'Product 2',
                '1',
                '$15.00',
                {
                  text: CurrencyFormatterHelper.formatCurrency(10),
                  alignment: 'right',
                },
              ],
              [
                '3',
                'Product 3',
                '3',
                '$20.00',
                {
                  text: CurrencyFormatterHelper.formatCurrency(56),
                  alignment: 'right',
                },
              ],
            ],
          },
        },
        {
          columns: [
            {
              width: '*',
              text: '',
            },
            {
              width: 'auto',
              layout: 'noBorders',
              table: {
                body: [
                  [
                    'Subtotal',
                    {
                      text: CurrencyFormatterHelper.formatCurrency(360),
                      alignment: 'right',
                    },
                  ],
                  [
                    { text: 'Total', bold: true },
                    {
                      text: CurrencyFormatterHelper.formatCurrency(3360),
                      alignment: 'right',
                      bold: true,
                    },
                  ],
                ],
              },
            },
          ],
        },
      ],
    };
  };
