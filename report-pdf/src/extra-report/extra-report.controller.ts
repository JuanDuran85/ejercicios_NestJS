import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportService } from './extra-report.service';
import type { TCreatedPdf } from 'pdfmake';
import type { Response } from 'express';

@Controller('extra-report')
export class ExtraReportController {
  constructor(private readonly extraReportService: ExtraReportService) {}

  @Get('html-report')
  public async getHtmlReports(
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const resultPdfCreated: TCreatedPdf =
      this.extraReportService.getHtmlReport();
    response.setHeader('Content-Type', 'application/pdf');

    const result: Buffer<ArrayBufferLike> = await resultPdfCreated.getBuffer();

    return response.send(result);
  }

  @Get('community-report')
  public async getCommunityReports(
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const resultPdfCreated: TCreatedPdf =
      this.extraReportService.getCommunityReport();
    response.setHeader('Content-Type', 'application/pdf');

    const result: Buffer<ArrayBufferLike> = await resultPdfCreated.getBuffer();

    return response.send(result);
  }
}
