import htmlToPdfmake from 'html-to-pdfmake';
import type { Content } from 'pdfmake';
import {JSDOM} from 'jsdom';
export const getHtmlContent: (htmlIn: string) => Content = (htmlIn: string) => {
  const {window} = new JSDOM();
  return htmlToPdfmake(window);
};
