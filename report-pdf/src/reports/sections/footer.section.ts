import type { Content } from 'pdfmake';
import { PageSize } from 'pdfmake/interfaces';

export const FooterSection: (
  currentPage: number,
  pageCount: number,
  pageSize: PageSize,
) => Content = (
  currentPage: number,
  pageCount: number,
  pageSize: PageSize,
): Content => {
  return {
    text: `Page: ${currentPage.toString()} of ${pageCount}`,
    margin: [0, 20, 35, 0],
    style: {
      fontSize: 10,
      bold: true,
      color: '#666',
      alignment: 'right',
    },
  };
};
