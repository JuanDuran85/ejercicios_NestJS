import htmlToPdfmake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';
import type { Content } from 'pdfmake';

interface ContentReplacer {
  [key: string]: string;
}

export const getHtmlContent: (
  htmlIn: string,
  replacers: ContentReplacer,
) => Content = (htmlIn: string, replacers: ContentReplacer = {}) => {
  const { window } = new JSDOM();
  return htmlToPdfmake(htmlIn, { window });
};
