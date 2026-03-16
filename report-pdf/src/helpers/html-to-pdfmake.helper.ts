import htmlToPdfmake from 'html-to-pdfmake';
import type { Content } from 'pdfmake';

export const getHtmlContent: (htmlIn: string) => Content = (htmlIn: string) => {
  return htmlToPdfmake(htmlIn);
};
