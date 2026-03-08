import { Injectable, NotFoundException } from '@nestjs/common';
import type { TCreatedPdf, TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from '../printer/printer.service';
import { PrismaService } from '../prisma.service';
import {
  getCountryReport,
  getEmploymentLetterByIdReport,
  getEmploymentLetterReport,
  getFinalBasicReport,
} from '../reports';

@Injectable()
export class BasicReportsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly printerService: PrinterService,
  ) {}
  public getBasicReport(): TCreatedPdf {
    const docDefinition = getFinalBasicReport({ name: 'John Doe' });
    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }

  public getEmploymentLetter(): TCreatedPdf {
    const docDefinition: TDocumentDefinitions = getEmploymentLetterReport();
    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }

  public async getEmploymentLetterById(
    employeeId: number,
  ): Promise<TCreatedPdf> {
    const employeeFound = await this.prismaService.employees.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employeeFound) throw new NotFoundException('Employee not found');

    const docDefinition: TDocumentDefinitions = getEmploymentLetterByIdReport({
      employeeName: employeeFound.name,
      employeePosition: employeeFound.position,
      employeeStartDate: employeeFound.start_date,
      employerName: 'John Doe',
      employerPosition: 'CEO',
      numberOfHours: employeeFound.hours_per_day,
      workSchedule: employeeFound.work_schedule,
      companyName: 'Toucan Company',
    });

    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }

  public getCountriesReports(): TCreatedPdf {
    const docDefinition: TDocumentDefinitions = getCountryReport();
    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }
}
