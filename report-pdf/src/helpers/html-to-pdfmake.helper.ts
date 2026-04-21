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
  
  Object.entries(replacers).forEach(([key, value]) => {
    const key1 = `{{ ${key} }}`;
    const key2 = `{{${key}}}`;
    htmlIn = htmlIn.replaceAll(key1, value).replaceAll(key2, value);
  });

  const { window } = new JSDOM();
  return htmlToPdfmake(htmlIn, { window });
};
