import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { BasicReportsService } from './basic-reports.service';
import type { TCreatedPdf } from 'pdfmake';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  public async getBasicReports(@Res() response: Response) {
    const resultPdfCreated: TCreatedPdf =
      this.basicReportsService.getBasicReport();

    response.setHeader('Content-Type', 'application/pdf');
    const result: Buffer<ArrayBufferLike> = await resultPdfCreated.getBuffer();
    return response.send(result);
  }
}
