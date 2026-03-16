import type { Content } from 'pdfmake';
import { Column, ContentText } from 'pdfmake/interfaces';
import { DateFormatter } from '../../helpers';

const logo: Content = {
  image: 'src/assets/toucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

const currentDate: Column = {
  text: DateFormatter.getFormattedDateByDayMonthYear(new Date()),
  alignment: 'right',
  margin: [20, 30],
  width: 100,
  fontSize: 7,
  bold: false,
};

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoAlignment?: 'left' | 'center' | 'right';
  logoMargin?: [number, number, number, number];
  showDate?: boolean;
  dateAlignment?: 'left' | 'center' | 'right';
  dateMargin?: [number, number, number, number];
  dateFormat?: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY';
  dateLabel?: string;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { title = false, subtitle, showLogo = true, showDate = true } = options;

  const headerLogo: Content = showLogo ? logo : '';
  const headerDate: ContentText | null = showDate ? currentDate : null;
  const headerTitle: ContentText | null = title
    ? {
        text: title,
        margin: [0, 15, 0, 0],
        alignment: 'center',
        style: {
          bold: true,
          fontSize: 22,
        },
      }
    : null;
  const headerSubtitle: ContentText | null = subtitle
    ? {
        text: subtitle,
        alignment: 'center',
        margin: [0, 2, 0, 0],
        style: {
          fontSize: 12,
          bold: false,
        },
      }
    : null;
  const headerStack = {
    stack: [headerTitle, headerSubtitle],
  };

  return {
    columns: [headerLogo, headerStack, headerDate],
  } as Content;
};
