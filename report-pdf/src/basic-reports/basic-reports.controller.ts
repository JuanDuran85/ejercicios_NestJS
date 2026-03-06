import { Controller, Get } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

   @Get()
    public async getBasicReports(): Promise<any> {
      return this.basicReportsService.getBasicReport();
    }
}
