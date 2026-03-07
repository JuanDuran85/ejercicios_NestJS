import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { BasicReportsService } from './basic-reports.service';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  public getBasicReports(@Res() response: Response) {
    const resultPdfCreated = this.basicReportsService.getBasicReport();

    response.setHeader('Content-Type', 'application/pdf');
    resultPdfCreated
      .write('result.pdf')
      .then(
        () => {
          console.debug(new Date());
        },
        (err) => {
          console.debug(err);
        },
      )
      .catch((err) => console.debug(err))
      .finally(() => {
        console.debug('finishing');
      });
     return response.send(resultPdfCreated);
  }
}
