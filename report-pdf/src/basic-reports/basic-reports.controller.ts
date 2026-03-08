import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import type { TCreatedPdf } from 'pdfmake';
import { BasicReportsService } from './basic-reports.service';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  public async getBasicReports(
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const resultPdfCreated: TCreatedPdf =
      this.basicReportsService.getBasicReport();

    response.setHeader('Content-Type', 'application/pdf');
    const result: Buffer<ArrayBufferLike> = await resultPdfCreated.getBuffer();
    return response.send(result);
  }

  @Get('employment-letter')
  public async getEmploymentLetter(
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const resultPdfCreated: TCreatedPdf =
      this.basicReportsService.getEmploymentLetter();
    response.setHeader('Content-Type', 'application/pdf');
    const result: Buffer<ArrayBufferLike> = await resultPdfCreated.getBuffer();
    return response.send(result);
  }
}
