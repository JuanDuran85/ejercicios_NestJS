import { PreconditionFailedException } from '@nestjs/common';
import type {
  Content,
  PageSize,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormatterHelper, DateFormatter } from '../helpers';
import { FooterSection } from './sections';

interface ReportValues {
  title?: string;
  subTitle?: string;
  data?: CompletedOrder;
}

export interface CompletedOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
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

export const orderByIdReport: (
  valuesIn: ReportValues,
) => TDocumentDefinitions = (valuesIn: ReportValues): TDocumentDefinitions => {
  const { data } = valuesIn;

  if (!data) throw new PreconditionFailedException('Data not found');

  const { order_id, customers, order_date, order_details } = data;
  const subTotal: number = order_details.reduce(
    (previousValue: number, currentValue: OrderDetail) =>
      Number(currentValue.products.price) * currentValue.quantity +
      previousValue,
    0,
  );
  const total: number = Number(subTotal) * 0.15 + Number(subTotal);

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
                text: `Ticket No#: ${order_id}\n`,
                bold: true,
                style: {
                  fontSize: 12,
                },
              },
              `Date received: ${DateFormatter.getFormattedDateByDayMonthYear(order_date)}\nPayment by: ${DateFormatter.getFormattedDateByDayMonthYear(new Date())}`,
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
          `Company name: ${customers.customer_name} 
           Address: ${customers.address}
           Postal Code: ${customers.postal_code}
           Country: ${customers.country}\n`,
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
            ...order_details.map((orderDetail: OrderDetail) => [
              orderDetail.product_id.toString(),
              orderDetail.products.product_name,
              { text: orderDetail.quantity.toString(), alignment: 'center' },
              {
                text: CurrencyFormatterHelper.formatCurrency(
                  Number(orderDetail.products.price),
                ),
                alignment: 'right',
              },
              {
                text: CurrencyFormatterHelper.formatCurrency(
                  orderDetail.quantity * Number(orderDetail.products.price),
                ),
                alignment: 'right',
              },
            ]),
          ],
        },
      } as Content,
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
                    text: CurrencyFormatterHelper.formatCurrency(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormatterHelper.formatCurrency(total),
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
