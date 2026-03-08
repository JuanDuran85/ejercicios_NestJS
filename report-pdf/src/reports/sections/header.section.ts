import type { Content } from 'pdfmake';
import { DateFormatter } from '../../helpers';

const logo: Content = {
  image: 'src/assets/toucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
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
  const headerDate = showDate
    ? ({
        text: DateFormatter.getFormattedDateByDayMonthYear(new Date()),
        alignment: 'right',
        margin: [20, 20],
      } as Content)
    : null;
  const headerTitle = title
    ? ({ text: title, style: { bold: true, alignment: 'center'} } as Content)
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  } as Content;
};
