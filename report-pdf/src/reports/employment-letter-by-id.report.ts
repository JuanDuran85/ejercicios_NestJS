import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';
import { headerSection } from './sections/header.section';

interface ReportValues {
  employerPosition: string;
  employerName: string;
  companyName: string;
  numberOfHours: number;
  workSchedule: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
}

const styles: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 60, 0, 20],
  },
  body: {
    margin: [0, 0, 0, 70],
    fontSize: 12,
    alignment: 'justify',
  },
  signature: {
    fontSize: 14,
    bold: true,
    alignment: 'left',
  },
  footer: {
    fontSize: 10,
    italics: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },
};

export const getEmploymentLetterByIdReport = (
  optionsValues: ReportValues,
): TDocumentDefinitions => {
  const {
    companyName,
    employeeName,
    employeePosition,
    employeeStartDate,
    employerName,
    employerPosition,
    numberOfHours,
    workSchedule,
  } = optionsValues;

  const docDefinition: TDocumentDefinitions = {
    styles,
    pageMargins: [40, 60, 40, 60],
    pageSize: 'LETTER',
    pageOrientation: 'portrait',
    displayTitle: true,
    header: headerSection({}),
    content: [
      { text: 'PROOF OF EMPLOYMENT', style: 'header' },
      {
        text: `I, ${employerName}, in my capacity as ${employerPosition} of ${companyName}, certify that ${employeeName} has worked for our company since ${DateFormatter.getFormattedDateByDayMonthYear(employeeStartDate)}. \n

        During their employment, Mr./Ms. ${employeeName} held the position of ${employeePosition}, demonstrating responsibility, commitment, and professionalism in the performance of their duties. \n

        Mr./Ms. ${employeeName}'s work schedule is ${numberOfHours} hours per week, with a schedule of ${workSchedule}, in accordance with the policies and procedures established by the company. \n

        This certificate is issued at the request of the interested party for any purpose they deem appropriate.`,
        style: 'body',
      },
      { text: `Sincerely`, style: 'signature' },
      { text: employerName, style: 'signature' },
      { text: employerPosition, style: 'signature' },
      { text: companyName, style: 'signature' },
      {
        text: DateFormatter.getFormattedDateByDayMonthYear(new Date()),
        style: 'signature',
      },
    ],
    footer: {
      text: 'This document is proof of employment and does not represent an employment commitment.',
      style: 'footer',
    },
    info: {
      title: 'My Report',
      author: 'John Doe',
      subject: 'Report',
      keywords: 'report, pdf',
      creator: 'pdfmake',
      producer: 'pdfmake',
      creationDate: new Date(),
      modDate: new Date(),
    },
  };

  return docDefinition;
};
