import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import type { TCreatedPdf } from 'pdfmake';
import { StoreReportsService } from './store-reports.service';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:orderId')
  public async getOrderReport(
    @Param('orderId') orderId: string,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const resultPdfCreated: TCreatedPdf =
      await this.storeReportsService.getOrderReport(Number(orderId));

    response.setHeader('Content-Type', 'application/pdf');
    const result: Buffer<ArrayBufferLike> = await resultPdfCreated.getBuffer();
    return response.send(result);
  }

  @Get('svgs-charts')
  public async getSvgChartsReport(
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const resultPdfCreated: TCreatedPdf =
      await this.storeReportsService.getSvgChart();

    response.setHeader('Content-Type', 'application/pdf');
    const result: Buffer<ArrayBufferLike> = await resultPdfCreated.getBuffer();
    return response.send(result);
  }
}
